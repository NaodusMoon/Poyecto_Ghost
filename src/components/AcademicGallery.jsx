import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Maximize, Minimize } from 'lucide-react';
import academics from '../data/academics.json';

function AcademicViewer({ item }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(() => item.pages.length > 1 && item.mode === 'carousel' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const viewer = useRef(null);
  const move = direction => setIndex(i => (i + direction + item.pages.length) % item.pages.length);
  useEffect(() => {
    if (!playing || hover || focused || document.hidden) return;
    const timer = setInterval(() => setIndex(i => (i + 1) % item.pages.length), 4500);
    return () => clearInterval(timer);
  }, [playing, hover, focused, item.pages.length]);
  useEffect(() => {
    const update = () => setExpanded(document.fullscreenElement === viewer.current);
    document.addEventListener('fullscreenchange', update);
    return () => document.removeEventListener('fullscreenchange', update);
  }, []);
  const fullscreen = async () => {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else await viewer.current.requestFullscreen(); } catch { setExpanded(v => !v); }
  };
  return <article className={'academic-viewer ' + (expanded ? 'expanded' : '')} ref={viewer} aria-label={item.title} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setFocused(true)} onBlur={e => {if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);}} onKeyDown={e => {if(e.key === 'ArrowRight') {e.preventDefault(); move(1);} if(e.key === 'ArrowLeft') {e.preventDefault(); move(-1);} if(e.key === 'Escape' && !document.fullscreenElement) setExpanded(false);}}>
    <div className="academic-title"><div><h3>{item.title}</h3></div><span className="academic-count">{String(index+1).padStart(2,'0')} / {String(item.pages.length).padStart(2,'0')}</span></div>
    <div className="academic-stage"><img key={index} src={item.pages[index]} alt={`${item.title}, ${item.mode === 'carousel' ? 'imagen' : 'diapositiva'} ${index+1} de ${item.pages.length}`} loading="lazy"/><button disabled={item.pages.length < 2} className="slide-arrow previous" aria-label={'Anterior: '+item.title} onClick={() => move(-1)}><ChevronLeft/></button><button disabled={item.pages.length < 2} className="slide-arrow next" aria-label={'Siguiente: '+item.title} onClick={() => move(1)}><ChevronRight/></button></div>
    <div className="academic-controls"><button disabled={item.pages.length < 2} className="playback" onClick={() => setPlaying(v => !v)} aria-label={(playing ? 'Pausar: ' : 'Reproducir: ')+item.title}>{playing ? <Pause size={16}/> : <Play size={16}/>}<span>{playing ? 'Pausar' : 'Reproducir'}</span></button><label>Ir a {item.mode === 'carousel' ? 'imagen' : 'diapositiva'}<select value={index} aria-label={'Elegir página: '+item.title} onChange={e => {setIndex(Number(e.target.value)); setPlaying(false);}}>{item.pages.map((_,i) => <option key={i} value={i}>{i+1}</option>)}</select></label><button className="icon-button" onClick={fullscreen} aria-label={(expanded ? 'Salir de pantalla completa: ' : 'Pantalla completa: ')+item.title}>{expanded ? <Minimize size={17}/> : <Maximize size={17}/>}</button></div>
    <div className="academic-thumbnails" aria-label={'Miniaturas: '+item.title}>{item.pages.map((src,i) => <button key={src} onClick={() => {setIndex(i); setPlaying(false);}} aria-label={`${item.title}: página ${i+1}`} aria-current={index === i ? 'true' : undefined}><img src={src} loading="lazy" alt=""/><span>{i+1}</span></button>)}</div>

  </article>;
}
export default function AcademicGallery() {
  return <section className="academic section" id="academico"><div className="section-heading"><div><h2>Nuestro mundo<br/><em>académico</em></h2></div></div><div className="academic-jump">{academics.map(item => <a href={'#materia-'+item.id} key={item.id}>{item.title} ↗</a>)}</div><div className="academic-grid">{academics.map(item => <div id={'materia-'+item.id} key={item.id}><AcademicViewer item={item}/></div>)}</div></section>;
}



