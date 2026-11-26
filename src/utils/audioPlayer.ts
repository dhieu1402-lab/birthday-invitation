/**
 * Audio Player Utility:
 * Supports HTML5 Audio playback + Web Audio API synthesizer fallback
 * (Plays a pleasant, acoustic music-box Happy Birthday melody if no mp3 is found).
 */

class BirthdayAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private currentUrl = '';
  private useSynthFallback = true;
  private audioLoadFailed = false;
  private isSynthesizing = false;
  private isPlaying = false;
  private shouldPlay = false;
  private playAttemptId = 0;
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeOscillators = new Set<OscillatorNode>();
  private synthTimeoutId: number | null = null;

  public init(url: string, useSynthFallback = true) {
    if (typeof window === 'undefined') return;
    this.useSynthFallback = useSynthFallback;

    if (this.audio && this.currentUrl === url) return;

    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }

    this.currentUrl = url;
    this.audioLoadFailed = false;
    this.audio = new Audio(url);
    this.audio.loop = true;
    this.audio.preload = 'auto';

    this.audio.addEventListener('play', () => {
      if (this.shouldPlay) {
        this.isPlaying = true;
      } else {
        this.audio?.pause();
      }
    });

    this.audio.addEventListener('pause', () => {
      if (!this.isSynthesizing) {
        this.isPlaying = false;
      }
    });

    this.audio.addEventListener('error', () => {
      // Audio file might not exist or failed to load -> will use fallback synthesizer
      this.audioLoadFailed = true;
    });
  }

  public async play(): Promise<boolean> {
    if (this.isPlaying || this.isSynthesizing) return true;

    this.shouldPlay = true;
    const attemptId = ++this.playAttemptId;

    // Try HTML5 Audio first
    if (this.audio && !this.audioLoadFailed) {
      try {
        await this.audio.play();
        if (!this.shouldPlay || attemptId !== this.playAttemptId) {
          this.audio.pause();
          return false;
        }
        this.isPlaying = true;
        return true;
      } catch {
        // Fallback to Web Audio synthesizer
      }
    }

    if (!this.shouldPlay || attemptId !== this.playAttemptId || !this.useSynthFallback) {
      this.isPlaying = false;
      return false;
    }

    // Web Audio Synthesizer: Plays Happy Birthday music box tune
    try {
      this.startSynthesizer();
      this.isPlaying = this.isSynthesizing;
      return this.isPlaying;
    } catch {
      this.isPlaying = false;
      return false;
    }
  }

  public pause() {
    this.shouldPlay = false;
    this.playAttemptId++;
    if (this.audio) {
      this.audio.pause();
    }
    this.stopSynthesizer();
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying || this.isSynthesizing || this.shouldPlay) {
      this.pause();
      return false;
    } else {
      void this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Chiptune / Music box Happy Birthday Melody
  private startSynthesizer() {
    if (this.isSynthesizing) return;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!this.audioCtx || this.audioCtx.state === 'closed') {
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      void this.audioCtx.resume();
    }

    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.setValueAtTime(1, this.audioCtx.currentTime);
    this.masterGain.connect(this.audioCtx.destination);

    this.isSynthesizing = true;
    this.playMelodyLoop();
  }

  private stopSynthesizer() {
    this.isSynthesizing = false;
    if (this.synthTimeoutId !== null) {
      window.clearTimeout(this.synthTimeoutId);
      this.synthTimeoutId = null;
    }

    // Immediately stop and disconnect any scheduled or playing oscillators
    for (const osc of this.activeOscillators) {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore if already stopped
      }
    }
    this.activeOscillators.clear();

    if (this.masterGain) {
      try {
        this.masterGain.disconnect();
      } catch {
        // ignore disconnect errors
      }
      this.masterGain = null;
    }

    if (this.audioCtx && this.audioCtx.state === 'running') {
      void this.audioCtx.suspend();
    }
  }

  private playTone(
    freq: number,
    duration: number,
    timeOffset: number,
    volume = 0.14,
    type: OscillatorType = 'sine',
    brightHarmonic = true
  ) {
    if (!this.audioCtx || !this.masterGain || !this.isSynthesizing) return;

    const startTime = this.audioCtx.currentTime + timeOffset;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0008, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    this.activeOscillators.add(osc);
    osc.onended = () => {
      this.activeOscillators.delete(osc);
      osc.disconnect();
      filter.disconnect();
      gain.disconnect();
    };

    osc.start(startTime);
    osc.stop(startTime + duration);

    // Subtle music-box chime overtone for melody notes
    if (brightHarmonic) {
      const overtone = this.audioCtx.createOscillator();
      const overtoneGain = this.audioCtx.createGain();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(freq * 2, startTime);

      overtoneGain.gain.setValueAtTime(0.0001, startTime);
      overtoneGain.gain.linearRampToValueAtTime(volume * 0.22, startTime + 0.015);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0005, startTime + Math.min(duration * 0.7, 0.45));

      overtone.connect(overtoneGain);
      overtoneGain.connect(this.masterGain);

      this.activeOscillators.add(overtone);
      overtone.onended = () => {
        this.activeOscillators.delete(overtone);
        overtone.disconnect();
        overtoneGain.disconnect();
      };

      overtone.start(startTime);
      overtone.stop(startTime + Math.min(duration * 0.75, 0.5));
    }
  }

  private playChord(freqs: number[], duration: number, timeOffset: number, volume = 0.035) {
    for (const freq of freqs) {
      this.playTone(freq, duration, timeOffset, volume, 'triangle', false);
    }
  }

  private playMelodyLoop() {
    if (!this.isSynthesizing) return;

    const beat = 0.48; // 125 BPM joyful 3/4 birthday waltz

    // Note frequencies (F major, bright music-box register)
    const C5 = 523.25;
    const D5 = 587.33;
    const E5 = 659.25;
    const F5 = 698.46;
    const G5 = 783.99;
    const A5 = 880.0;
    const Bb5 = 932.33;
    const C6 = 1046.5;
    const F6 = 1396.91;

    // Accompaniment frequencies (warm lower-mid harmony)
    const F3 = 174.61;
    const G3 = 196.0;
    const A3 = 220.0;
    const Bb3 = 233.08;
    const C4 = 261.63;
    const D4 = 293.66;
    const E4 = 329.63;
    const F4 = 349.23;

    // Melody notes in strict 3/4 waltz timing
    const melody: Array<{ f: number; t: number; d: number; v?: number }> = [
      // Pickup
      { f: C5, t: 0, d: 0.34 },
      { f: C5, t: 0.34, d: 0.16 },
      // Bar 1: Happy birthday to you (F)
      { f: D5, t: beat * 1, d: 0.46 },
      { f: C5, t: beat * 2, d: 0.46 },
      { f: F5, t: beat * 3, d: 0.46 },
      // Bar 2 (C7)
      { f: E5, t: beat * 4, d: 0.92 },
      { f: C5, t: beat * 6, d: 0.34 },
      { f: C5, t: beat * 6 + 0.34, d: 0.16 },
      // Bar 3: Happy birthday to you (C7)
      { f: D5, t: beat * 7, d: 0.46 },
      { f: C5, t: beat * 8, d: 0.46 },
      { f: G5, t: beat * 9, d: 0.46 },
      // Bar 4 (F)
      { f: F5, t: beat * 10, d: 0.92 },
      { f: C5, t: beat * 12, d: 0.34 },
      { f: C5, t: beat * 12 + 0.34, d: 0.16 },
      // Bar 5: Happy birthday dear friends (F7)
      { f: C6, t: beat * 13, d: 0.46 },
      { f: A5, t: beat * 14, d: 0.46 },
      { f: F5, t: beat * 15, d: 0.46 },
      // Bar 6 (Bb)
      { f: E5, t: beat * 16, d: 0.46 },
      { f: D5, t: beat * 17, d: 0.95 },
      // Bar 7: Gentle chime breath + pickup to finale
      { f: Bb5, t: beat * 21, d: 0.34 },
      { f: Bb5, t: beat * 21 + 0.34, d: 0.16 },
      // Bar 8: Happy birthday to you (F/C -> C7)
      { f: A5, t: beat * 22, d: 0.46 },
      { f: F5, t: beat * 23, d: 0.46 },
      { f: G5, t: beat * 24, d: 0.46 },
      // Bar 9: Finale (F) + celebratory sparkle
      { f: F5, t: beat * 25, d: 1.35, v: 0.16 },
      { f: A5, t: beat * 26.25, d: 0.45, v: 0.08 },
      { f: C6, t: beat * 26.75, d: 0.55, v: 0.08 },
      { f: F6, t: beat * 27.25, d: 0.9, v: 0.07 },
    ];

    for (const note of melody) {
      this.playTone(note.f, note.d, note.t, note.v ?? 0.13, 'sine', true);
    }

    // 3/4 Waltz chord accompaniment (bass on beat 1, soft chords on beats 2 & 3)
    const bars: Array<{ startBeat: number; bass: number; chord: number[] }> = [
      { startBeat: 1, bass: F3, chord: [A3, C4] },
      { startBeat: 4, bass: G3, chord: [Bb3, E4] },
      { startBeat: 7, bass: G3, chord: [Bb3, E4] },
      { startBeat: 10, bass: F3, chord: [A3, C4] },
      { startBeat: 13, bass: F3, chord: [A3, C4] },
      { startBeat: 16, bass: Bb3, chord: [D4, F4] },
      { startBeat: 19, bass: Bb3, chord: [D4, F4] },
      { startBeat: 22, bass: C4, chord: [E4, Bb3] },
      { startBeat: 25, bass: F3, chord: [A3, C4] },
    ];

    for (const bar of bars) {
      const b1 = beat * bar.startBeat;
      this.playTone(bar.bass, beat * 0.85, b1, 0.055, 'sine', false);
      this.playChord(bar.chord, beat * 0.55, b1 + beat, 0.032);
      this.playChord(bar.chord, beat * 0.55, b1 + beat * 2, 0.026);
    }

    const totalDurationSec = beat * 29.5;
    this.synthTimeoutId = window.setTimeout(() => {
      if (this.isSynthesizing) {
        this.playMelodyLoop();
      }
    }, totalDurationSec * 1000);
  }
}

export const birthdayAudioPlayer = new BirthdayAudioPlayer();
