'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModernVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export function ModernVideoPlayer({
  src,
  poster,
  className = '',
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true
}: ModernVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Initialiser la vidéo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoaded(true);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };
    
    const handleEnded = () => {
      if (!loop) {
        setIsPlaying(false);
      }
    };
    
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [loop]);
  
  // Gérer la lecture/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.play().catch(() => {
        // En cas d'erreur (par exemple, si l'autoplay est bloqué)
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);
  
  // Gérer le son
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = isMuted;
  }, [isMuted]);
  
  // Formater le temps (secondes -> MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Gérer le clic sur la barre de progression
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * video.duration;
    
    video.currentTime = newTime;
  };
  
  // Masquer les contrôles après un délai d'inactivité
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (showControls) {
      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    }
    
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [showControls, isPlaying]);
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onMouseMove={() => setShowControls(true)}
      data-cursor="hover"
    >
      {/* Vidéo */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        playsInline
        loop={loop}
        muted={isMuted}
        onClick={() => setIsPlaying(!isPlaying)}
      />
      
      {/* Overlay de chargement */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Contrôles personnalisés */}
      {controls && (
        <AnimatePresence>
          {(showControls || !isPlaying) && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Barre de progression */}
              <div 
                className="px-4 pb-2 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              
              {/* Contrôles principaux */}
              <div className="px-4 pb-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Bouton lecture/pause */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlaying(!isPlaying);
                    }}
                    className="text-white hover:text-blue-400 transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Lecture'}
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    )}
                  </button>
                  
                  {/* Bouton son */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted(!isMuted);
                    }}
                    className="text-white hover:text-blue-400 transition-colors"
                    aria-label={isMuted ? 'Activer le son' : 'Désactiver le son'}
                  >
                    {isMuted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    )}
                  </button>
                  
                  {/* Temps */}
                  <div className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
                
                {/* Bouton plein écran */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (videoRef.current) {
                      if (document.fullscreenElement) {
                        document.exitFullscreen();
                      } else {
                        videoRef.current.requestFullscreen();
                      }
                    }
                  }}
                  className="text-white hover:text-blue-400 transition-colors"
                  aria-label="Plein écran"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      
      {/* Bouton de lecture central (visible uniquement lorsque la vidéo est en pause) */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white w-20 h-20 rounded-full flex items-center justify-center"
            onClick={() => setIsPlaying(true)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Lecture"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
