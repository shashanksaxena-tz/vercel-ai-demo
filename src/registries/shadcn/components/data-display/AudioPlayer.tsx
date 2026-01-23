'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Music } from 'lucide-react';

export const AudioPlayer = ({ element }: ComponentRenderProps) => {
  const {
    src,
    title,
    artist,
    album,
    cover,
    autoPlay = false,
    loop = false,
    showVolume = true,
    showPlaybackRate = false,
    variant = 'default',
    style,
  } = element.props;

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay as boolean);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(loop as boolean);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progress = progressRef.current;
    if (!audio || !progress) return;

    const rect = progress.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    audio.currentTime = clickPosition * duration;
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  };

  const toggleLoop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = !isLooping;
    setIsLooping(!isLooping);
  };

  const changePlaybackRate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    audio.playbackRate = newRate;
    setPlaybackRate(newRate);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn(
        'border rounded-lg overflow-hidden',
        variant === 'card' && 'bg-card shadow-md',
        variant === 'minimal' && 'border-0 bg-muted/30'
      )}
      style={style as React.CSSProperties}
    >
      <audio ref={audioRef} src={src as string} autoPlay={autoPlay as boolean} loop={loop as boolean} />

      <div className="p-4">
        {/* Track Info */}
        <div className="flex items-center gap-4 mb-4">
          {cover ? (
            <img
              src={cover as string}
              alt={title as string || 'Album cover'}
              className="w-16 h-16 rounded-md object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Music className="h-8 w-8 text-primary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            {title && <p className="font-semibold truncate">{title as string}</p>}
            {artist && <p className="text-sm text-muted-foreground truncate">{artist as string}</p>}
            {album && <p className="text-xs text-muted-foreground truncate">{album as string}</p>}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div
            ref={progressRef}
            className="w-full h-1.5 bg-muted rounded-full cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-primary rounded-full relative transition-all"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={toggleLoop}
              className={cn(
                'p-2 rounded-full hover:bg-muted transition-colors',
                isLooping && 'text-primary'
              )}
            >
              <Repeat className="h-4 w-4" />
            </button>
            {showPlaybackRate && (
              <button
                onClick={changePlaybackRate}
                className="p-2 rounded-full hover:bg-muted transition-colors text-xs font-medium min-w-[2.5rem]"
              >
                {playbackRate}x
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => skip(-10)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              onClick={togglePlay}
              className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </button>
            <button
              onClick={() => skip(10)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>

          {showVolume && (
            <div className="flex items-center gap-1">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 accent-primary"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
