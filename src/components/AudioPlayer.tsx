import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface AudioPlayerProps {
  url: string;
  title: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ url, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Reset state when URL changes
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [url]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error('Audio play error:', err));
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newVol = parseFloat(e.target.value);
    audioRef.current.volume = newVol;
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const resetAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div className="bg-[#DFF3E3] border border-[#A8D5BA] rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col space-y-4">
      {/* Invisible Audio Element */}
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0 pr-4">
          <span className="text-xs uppercase font-bold tracking-wider text-[#6B756D]">Đang phát Podcast</span>
          <h4 className="font-display font-semibold text-lg text-[#2F3A32] truncate mt-0.5" title={title}>
            {title}
          </h4>
        </div>
        
        {/* Play Wave Animation */}
        <div className="flex items-end space-x-1 h-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-1 bg-[#A8D5BA] rounded-full transition-all duration-300 ${
                isPlaying ? 'animate-bounce' : 'h-1.5'
              }`}
              style={{
                height: isPlaying ? `${Math.floor(Math.random() * 16) + 8}px` : '6px',
                animationDelay: `${i * 0.15}s`,
                animationDuration: '0.8s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Control bar */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#A8D5BA] text-[#2F3A32] hover:bg-[#8ec3a2] hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} className="ml-1" fill="currentColor" />}
          </button>

          {/* Reset Button */}
          <button
            onClick={resetAudio}
            className="p-2 text-[#6B756D] hover:text-[#2F3A32] hover:bg-[#FCFBF7]/50 rounded-full transition-all"
            title="Nghe lại"
          >
            <RotateCcw size={18} />
          </button>

          {/* Progress Bar */}
          <div className="flex-1 flex items-center space-x-2">
            <span className="text-xs text-[#6B756D] font-mono select-none w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              ref={progressBarRef}
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer bg-white/60 accent-[#A8D5BA] outline-none"
            />
            <span className="text-xs text-[#6B756D] font-mono select-none w-10">
              {formatTime(duration)}
            </span>
          </div>

          {/* Volume Control */}
          <div className="hidden sm:flex items-center space-x-2 border-l border-[#A8D5BA]/50 pl-4">
            <button
              onClick={toggleMute}
              className="text-[#6B756D] hover:text-[#2F3A32] transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 rounded-lg appearance-none cursor-pointer bg-white/60 accent-[#A8D5BA]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AudioPlayer;
