/**
 * Audio Player Utility:
 * Supports HTML5 Audio playback + Web Audio API synthesizer fallback
 * (Plays a pleasant, acoustic music-box Happy Birthday melody if no mp3 is found).
 */

class BirthdayAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private isSynthesizing = false;
  private isPlaying = false;
  private audioCtx: AudioContext | null = null;
  private synthTimeoutId: number | null = null;

  public init(url: string) {
    if (typeof window === 'undefined') return;
    this.audio = new Audio(url);
    this.audio.loop = true;
    this.audio.preload = 'auto';

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
    });

    this.audio.addEventListener('error', () => {
      // Audio file might not exist or failed to load -> will use fallback synthesizer
    });
  }

  public async play(): Promise<boolean> {
    if (this.isPlaying) return true;

    // Try HTML5 Audio first
    if (this.audio) {
      try {
        await this.audio.play();
        this.isPlaying = true;
        return true;
      } catch {
        // Fallback to Web Audio synthesizer
      }
    }

    // Web Audio Synthesizer: Plays Happy Birthday music box tune
    try {
      this.startSynthesizer();
      this.isPlaying = true;
      return true;
    } catch {
      this.isPlaying = false;
      return false;
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
    }
    this.stopSynthesizer();
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Chiptune / Music box Happy Birthday Melody
  private startSynthesizer() {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!this.audioCtx || this.audioCtx.state === 'closed') {
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.isSynthesizing = true;
    this.playMelodyLoop();
  }

  private stopSynthesizer() {
    this.isSynthesizing = false;
    if (this.synthTimeoutId) {
      window.clearTimeout(this.synthTimeoutId);
      this.synthTimeoutId = null;
    }
  }

  private playTone(freq: number, duration: number, timeOffset: number) {
    if (!this.audioCtx || !this.isSynthesizing) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    // Warm, bell-like sine + triangle mixture
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + timeOffset);

    // Envelope
    const startTime = this.audioCtx.currentTime + timeOffset;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.18, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  private playMelodyLoop() {
    if (!this.isSynthesizing) return;

    // Frequencies (Hz) for Happy Birthday in Key of C
    // G4, G4, A4, G4, C5, B4 | G4, G4, A4, G4, D5, C5 | G4, G4, G5, E5, C5, B4, A4 | F5, F5, E5, C5, D5, C5
    const notes = [
      { f: 261.63, d: 0.35, pause: 0.4 }, // G4 / C4
      { f: 261.63, d: 0.35, pause: 0.4 },
      { f: 293.66, d: 0.7, pause: 0.8 },  // A4 / D4
      { f: 261.63, d: 0.7, pause: 0.8 },  // G4
      { f: 349.23, d: 0.7, pause: 0.8 },  // C5 / F4
      { f: 329.63, d: 1.2, pause: 1.4 },  // B4 / E4

      { f: 261.63, d: 0.35, pause: 0.4 },
      { f: 261.63, d: 0.35, pause: 0.4 },
      { f: 293.66, d: 0.7, pause: 0.8 },
      { f: 261.63, d: 0.7, pause: 0.8 },
      { f: 392.00, d: 0.7, pause: 0.8 },  // G4
      { f: 349.23, d: 1.2, pause: 1.4 },  // F4

      { f: 261.63, d: 0.35, pause: 0.4 },
      { f: 261.63, d: 0.35, pause: 0.4 },
      { f: 523.25, d: 0.7, pause: 0.8 },  // C5
      { f: 440.00, d: 0.7, pause: 0.8 },  // A4
      { f: 349.23, d: 0.7, pause: 0.8 },  // F4
      { f: 329.63, d: 0.7, pause: 0.8 },  // E4
      { f: 293.66, d: 1.0, pause: 1.2 },  // D4

      { f: 466.16, d: 0.35, pause: 0.4 }, // Bb4
      { f: 466.16, d: 0.35, pause: 0.4 },
      { f: 440.00, d: 0.7, pause: 0.8 },
      { f: 349.23, d: 0.7, pause: 0.8 },
      { f: 392.00, d: 0.7, pause: 0.8 },
      { f: 349.23, d: 1.5, pause: 2.0 },
    ];

    let offset = 0;
    for (const note of notes) {
      this.playTone(note.f, note.d, offset);
      offset += note.pause;
    }

    // Schedule next loop
    this.synthTimeoutId = window.setTimeout(() => {
      if (this.isSynthesizing) {
        this.playMelodyLoop();
      }
    }, (offset + 1) * 1000);
  }
}

export const birthdayAudioPlayer = new BirthdayAudioPlayer();
