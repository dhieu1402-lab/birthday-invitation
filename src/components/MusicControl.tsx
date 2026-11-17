import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { birthdayAudioPlayer } from '../utils/audioPlayer';
import { eventConfig } from '../config/eventConfig';

interface MusicControlProps {
  isOpened: boolean;
}

export const MusicControl: React.FC<MusicControlProps> = ({ isOpened }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    birthdayAudioPlayer.init(eventConfig.music.audioUrl);
  }, []);

  useEffect(() => {
    if (isOpened && !hasInteracted) {
      birthdayAudioPlayer.play().then((started) => {
        setIsPlaying(started);
        setHasInteracted(true);
      });
    }
  }, [isOpened, hasInteracted]);

  const handleToggle = () => {
    const nextState = birthdayAudioPlayer.toggle();
    setIsPlaying(nextState);
    setHasInteracted(true);
  };

  if (!isOpened) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full border backdrop-blur-md transition-all duration-300 shadow-lg ${
          isPlaying
            ? 'bg-amber-500/20 border-amber-400/50 text-amber-300 shadow-amber-500/20'
            : 'bg-slate-900/70 border-slate-700/60 text-slate-400 hover:text-slate-200'
        }`}
      >
        {isPlaying ? (
          <>
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-5 h-5 animate-pulse text-amber-300" />
              {/* Equalizer Wave effect */}
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </div>
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-full bg-amber-400 animate-pulse"></span>
              <span className="w-0.5 h-2 bg-amber-400 animate-pulse delay-75"></span>
              <span className="w-0.5 h-3 bg-amber-400 animate-pulse delay-150"></span>
            </div>
            <span className="text-xs font-medium tracking-wide hidden sm:inline-block">
              Nhạc sinh nhật
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-5 h-5 text-slate-400" />
            <span className="text-xs font-medium tracking-wide hidden sm:inline-block">
              Bật âm thanh
            </span>
          </>
        )}
      </button>
    </div>
  );
};
