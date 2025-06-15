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
  playOnScroll?: boolean; // Nouvelle propriété pour activer la lecture au scroll
}

export function ModernVideoPlayer({
  src,
  poster,
  className = '',
  autoPlay = false,
  loop = false,
  muted = false,
  controls = false, // Désactiver les contrôles par défaut
  playOnScroll = true // Activer par défaut
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
    
    const handleLoadedData = () => {
      // Marquer la vidéo comme chargée dès que les premières données sont disponibles
      setIsLoaded(true);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
      
      // S'assurer que isLoaded est true dès que la vidéo commence à jouer
      if (!isLoaded && video.currentTime > 0) {
        setIsLoaded(true);
      }
    };
    
    // Configuration de l'Intersection Observer pour la lecture au scroll
    if (playOnScroll) {
      const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // 50% de la vidéo doit être visible
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // La vidéo est visible dans le viewport
            video.play().catch(err => console.log('Lecture automatique impossible:', err));
            setIsPlaying(true);
          } else {
            // La vidéo n'est plus visible
            video.pause();
            setIsPlaying(false);
          }
        });
      }, options);
      
      observer.observe(video);
      
      return () => {
        observer.unobserve(video);
      };
    }
    
    const handleEnded = () => {
      if (!loop) {
        setIsPlaying(false);
      }
    };
    
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    
    // Pour la lecture au scroll, masquer immédiatement le spinner
    if (playOnScroll) {
      // Forcer isLoaded à true après un court délai pour éviter le spinner
      setTimeout(() => setIsLoaded(true), 300);
    }
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
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
      
      {/* Overlay de chargement - masqué pour la lecture au scroll */}
      <AnimatePresence>
        {!isLoaded && !playOnScroll && (
          <motion.div
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Contrôles personnalisés - masqués */}
      
      {/* Bouton de lecture central masqué */}
    </div>
  );
}
