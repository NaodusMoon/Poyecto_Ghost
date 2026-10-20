import React, { useRef, useState } from 'react';
import { ArrowUpRight, X, Upload, FileText, Image, Film } from 'lucide-react';
import { projects } from '../data/projects';
import useLocalState from './useLocalState';
import AcademicGallery from './AcademicGallery';
import InterestLinks from './InterestLinks';
import ProjectExtras from './ProjectExtras';
import ImmersiveLab from './ImmersiveLab';
import TechnologyStudio from './TechnologyStudio';
import FinalChapter from './FinalChapter';
import PersonalStories from './PersonalStories';
import Marquee from './Marquee';

export default function ProjectLibrary({ children }) {
  const [filter, setFilter] = useState('Todos');
  const [query, setQuery] = useState('');
  const [favorites, setFavorites, saveError] = useLocalState('komorebi-favorites', []);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const visible = projects.filter(p => (filter === 'Todos' || p.category === filter) && (!onlyFavorites || favorites.includes(p.title)) && normalize(p.title + ' ' + p.label).includes(normalize(query)));
  const toggleFavorite = title => setFavorites(favorites.includes(title) ? favorites.filter(t => t !== title) : [...favorites, title]);
  const [selected, setSelected] = useState(null);
  const [files, setFiles] = useState({});
  const input = useRef(null);
  const attach = e => { const file = e.target.files[0]; if (!file) return; const previous = files[selected.title]; if (previous) URL.revokeObjectURL(previous.url); setFiles(v => ({ ...v, [selected.title]: { url: URL.createObjectURL(file), name: file.name, type: file.type } })); e.target.value = ''; };
  const current = selected && (files[selected.title] || selected.asset);
  const chapters = [{id:'personal',letter:'01',title:'DATOS PERSONALES VIDEO HISTORIA DE VIDA',subtitle:'',items:visible.filter(p => p.category === 'Personal')},{id:'informatica',letter:'03',title:'Realidades que se encuentran',subtitle:'INFOGRAFÍA REALIDAD VIRTUAL Y REALIDAD AUMENTADA',items:visible.filter(p => p.category === 'Informática')}];
  return <section className="library" id="proyectos"><div className="section library-intro"><div className="section-heading"><div><span className="eyebrow">UN ANUARIO, MUCHAS FORMAS DE CONOCERME</span><h2>Mi historia,<br/><em>capítulo a capítulo</em></h2></div><p>Un recorrido por lo que soy, lo que aprendo<br/>y todo lo que todavía quiero llegar a ser</p></div>
    <div className="filters" aria-label="Filtrar proyectos">{['Todos', 'Personal', 'Informática', 'Inspiración'].map(f => <button key={f} aria-pressed={filter === f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}{f === 'Todos' && <span>{projects.length}</span>}</button>)}</div>
    <div className="library-tools"><input type="search" aria-label="Buscar trabajos" placeholder="Busca una idea, un tema, un proyecto…" value={query} onChange={e => setQuery(e.target.value)}/><button className={'favorite-filter ' + (onlyFavorites ? 'active' : '')} aria-pressed={onlyFavorites} onClick={() => setOnlyFavorites(!onlyFavorites)}>♡ Mis favoritos ({favorites.length})</button><span role="status">{visible.length} trabajos</span></div>
    {saveError && <p role="status">{saveError}</p>}
    {(query || filter !== 'Todos' || onlyFavorites) && <div className="library-search-results">{visible.map(p => <article key={p.title}><a href={p.category==='Personal'?'#personal':p.title==='Realidad virtual y aumentada'||p.title==='Práctica de realidad aumentada'?'#informatica':p.title==='Mapa conceptual HTML'?'#mapa-html':p.title==='Temas de interés'?'#intereses':p.title==='Proyecto de vida'?'#proyecto-vida':'#tecnologia'}>{p.title} ↗</a><button aria-label={'Guardar en favoritos: '+p.title} aria-pressed={favorites.includes(p.title)} onClick={()=>toggleFavorite(p.title)}>{favorites.includes(p.title)?'♥':'♡'}</button></article>)}</div>}

    </div>
    {chapters.map((chapter, ci) => <React.Fragment key={chapter.id}><section className={'chapter section chapter-'+chapter.id} id={chapter.id}><div className="chapter-heading"><span className="chapter-letter">{chapter.letter}</span><div><span className="eyebrow">{chapter.subtitle}</span><h2>{chapter.title}</h2></div></div>{chapter.id === 'informatica' && <ImmersiveLab/>}<div className="project-grid">{chapter.items.filter(p => chapter.id !== 'informatica').map((p, i) => <article className="project-wrapper" key={p.title}><button className={'project-card color-' + i % 4} onClick={() => setSelected(p)}><div className="project-art"><span>{p.icon}</span><small>A TRAVÉS DEL ESPEJO — 2026</small><ArrowUpRight size={23}/></div><div className="project-meta"><small>{p.category} / {p.file.split('.').pop().toUpperCase()}</small><h3>{p.title}</h3><p>{p.label}</p><span className="pending-tag">{files[p.title] ? 'Vista previa local añadida' : p.asset ? 'Disponible · Ver contenido' : 'Archivo pendiente'}</span></div></button><button className={'favorite-toggle ' + (favorites.includes(p.title) ? 'saved' : '')} aria-label={'Guardar en favoritos: ' + p.title} aria-pressed={favorites.includes(p.title)} onClick={() => toggleFavorite(p.title)}>{favorites.includes(p.title) ? '♥' : '♡'}</button></article>)}</div>{chapter.id === 'personal' && <PersonalStories/>}{chapter.id === 'intereses' && <InterestLinks/>}</section>{ci === 0 && <><AcademicGallery/><Marquee reverse/></>}{ci === 1 && <><TechnologyStudio/><FinalChapter/></>}</React.Fragment>)}
    {!visible.length && <div className="empty-file"><p>No encontramos trabajos con esta selección</p><button className="button secondary" onClick={() => {setQuery(''); setFilter('Todos'); setOnlyFavorites(false);}}>Ver todos los trabajos</button></div>}
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><section className="modal" role="dialog" aria-modal="true" aria-label={selected.title} onClick={e => e.stopPropagation()} onKeyDown={e => { if (e.key === 'Escape') setSelected(null); }}><button className="close" onClick={() => setSelected(null)} aria-label="Cerrar"><X/></button><span className="eyebrow">{selected.category} / ARCHIVO DE LA PROM</span><h2>{selected.title}</h2><p>{selected.label}.</p>{current ? <><a className="button" href={current.url} target="_blank" rel="noreferrer">Abrir {current.name}<ArrowUpRight size={18}/></a>{current.type.startsWith('image/') && <img className="preview" src={current.url} alt={selected.title}/>} {current.type.startsWith('video/') && <video className="preview personal-video" src={current.url} controls playsInline preload="metadata"/>}{current.type === 'application/pdf' && selected.asset && !files[selected.title] ? <img className="document-page" src={selected.asset.preview} alt={selected.title}/> : current.type === 'application/pdf' && <iframe className="pdf-preview" title={selected.title} src={current.url}/>}</> : <div className="empty-file"><FileText/><p>Este trabajo está esperando su archivo</p><small>Archivo previsto: {selected.file}</small></div>}<button className="button secondary" onClick={() => input.current.click()}><Upload size={17}/> {current ? 'Cambiar archivo' : 'Añadir archivo, imagen o video'}</button><input ref={input} type="file" hidden onChange={attach} accept=".pdf,.ppt,.pptx,image/*,video/*"/><ProjectExtras key={selected.title} title={selected.title}/><small className="local-note">Los archivos originales de Mi historia están integrados en la web; los archivos de reemplazo y de apoyo seleccionados aquí son vistas previas temporales</small></section></div>}
  </section>;
}


