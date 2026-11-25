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
        className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full border backdrop-blur-md transition-all duration-300 shadow-lg font-display cursor-pointer ${
          isPlaying
            ? 'bg-[#0284c7] border-[#38bdf8] text-white shadow-[#0284c7]/35'
            : 'bg-white border-[#0284c7]/25 text-[#0284c7] hover:bg-[#f0f9ff] shadow-[#033469]/15'
        }`}
      >
        {isPlaying ? (
          <>
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-5 h-5 animate-pulse text-white" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f5c542] opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f5c542]"></span>
              </span>
            </div>
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-full bg-white animate-pulse"></span>
              <span className="w-0.5 h-2 bg-white animate-pulse delay-75"></span>
              <span className="w-0.5 h-3 bg-white animate-pulse delay-150"></span>
            </div>
            <span className="text-xs font-semibold tracking-wide hidden sm:inline-block">
              Nhạc sinh nhật
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-5 h-5 text-[#0284c7]" />
            <span className="text-xs font-semibold tracking-wide hidden sm:inline-block">
              Bật âm thanh
            </span>
          </>
        )}
      </button>
    </div>
  );
};
