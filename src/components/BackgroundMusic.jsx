import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
  const audio = useRef(null);
  const enabled = useRef(true);
  const [wanted, setWanted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const [error, setError] = useState(false);
  const sync = useRef(() => {});

  useEffect(() => {
    const track = audio.current;
    let disposed = false;
    track.volume = 0.3;
    const hasVideo = () => [...document.querySelectorAll('video')].some(v => !v.paused && !v.ended);
    const update = async () => {
      if (disposed) return;
      const busy = hasVideo();
      setVideoActive(busy);
      if (!enabled.current || busy || document.hidden) { track.pause(); return; }
      if (!track.paused) return;
      try {
        await track.play();
        // A video or manual pause can occur while play() is pending.
        if (disposed || !enabled.current || hasVideo() || document.hidden) track.pause();
      } catch { /* Browsers may require a user gesture before playing audio. */ }
    };
    sync.current = update;
    const mediaChanged = event => {
      if (event.target instanceof HTMLVideoElement) queueMicrotask(update);
    };
    const unlock = event => {
      if (!event.target.closest?.('video, .background-music')) update();
    };
    for (const event of ['play', 'pause', 'ended', 'emptied']) document.addEventListener(event, mediaChanged, true);
    document.addEventListener('visibilitychange', update);
    document.addEventListener('pointerdown', unlock);
    document.addEventListener('keydown', unlock);
    // Removing a playing video (for example by switching profiles) must release the music.
    const observer = new MutationObserver(update);
    observer.observe(document.getElementById('root'), { childList: true, subtree: true });
    update();
    return () => {
      disposed = true;
      track.pause();
      observer.disconnect();
      for (const event of ['play', 'pause', 'ended', 'emptied']) document.removeEventListener(event, mediaChanged, true);
      document.removeEventListener('visibilitychange', update);
      document.removeEventListener('pointerdown', unlock);
      document.removeEventListener('keydown', unlock);
    };
  }, []);

  const toggle = () => {
    // If autoplay was blocked, the first click activates music instead of disabling it.
    const next = wanted && (playing || videoActive) ? false : true;
    enabled.current = next;
    setWanted(next);
    sync.current();
  };
  const label = error ? 'Audio no disponible' : !wanted ? 'Activar música' : videoActive ? 'Música en pausa por video' : playing ? 'Pausar música' : 'Activar música';
  return <div className="background-music">
    <audio ref={audio} src="/media/ambiente.mp3" autoPlay loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setError(true)}/>
    <button type="button" onClick={toggle} disabled={error} aria-label={videoActive && wanted ? 'Desactivar música de fondo' : label} aria-pressed={wanted && (playing || videoActive)} title={label}>
      {playing ? <Volume2 size={18}/> : <VolumeX size={18}/>}<span>{label}</span>
    </button>
  </div>;
}
