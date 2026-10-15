import React, { useRef, useState } from 'react';
import { ArrowUpRight, X, Upload, FileText, Image, Film } from 'lucide-react';
import { projects } from '../data/projects';
import useLocalState from './useLocalState';

export default function ProjectLibrary() {
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
  const current = selected && files[selected.title];
  return <section className="library section" id="proyectos"><div className="section-heading"><div><span className="eyebrow">02 / LO QUE HEMOS CREADO</span><h2>Pequeñas ideas.<br/><em>Grandes comienzos.</em></h2></div><p>Una colección de aprendizajes, curiosidades<br/>y un poquito de nosotros en cada proyecto.</p></div>
    <div className="filters" aria-label="Filtrar proyectos">{['Todos', 'Personal', 'Informática', 'Inspiración', 'Recuerdos'].map(f => <button key={f} aria-pressed={filter === f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}{f === 'Todos' && <span>13</span>}</button>)}</div>
    <div className="library-tools"><input type="search" aria-label="Buscar trabajos" placeholder="Busca una idea, un tema, un proyecto…" value={query} onChange={e => setQuery(e.target.value)}/><button className={'favorite-filter ' + (onlyFavorites ? 'active' : '')} aria-pressed={onlyFavorites} onClick={() => setOnlyFavorites(!onlyFavorites)}>♡ Mis favoritos ({favorites.length})</button><span role="status">{visible.length} trabajos</span></div>
    {saveError && <p role="status">{saveError}</p>}
    <div className="project-grid">{visible.map((p, i) => <article className="project-wrapper" key={p.title}><button className={'project-card color-' + i % 4} onClick={() => setSelected(p)}><div className="project-art"><span>{p.icon}</span><small>KMRB — 2026</small><ArrowUpRight size={23}/></div><div className="project-meta"><small>{p.category} / {p.file.split('.').pop().toUpperCase()}</small><h3>{p.title}</h3><p>{p.label}</p></div></button><button className={'favorite-toggle ' + (favorites.includes(p.title) ? 'saved' : '')} aria-label={'Guardar en favoritos: ' + p.title} aria-pressed={favorites.includes(p.title)} onClick={() => toggleFavorite(p.title)}>{favorites.includes(p.title) ? '♥' : '♡'}</button></article>)}</div>
    {!visible.length && <div className="empty-file"><p>No encontramos trabajos con esta selección.</p><button className="button secondary" onClick={() => {setQuery(''); setFilter('Todos'); setOnlyFavorites(false);}}>Ver todos los trabajos</button></div>}
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><section className="modal" role="dialog" aria-modal="true" aria-label={selected.title} onClick={e => e.stopPropagation()} onKeyDown={e => { if (e.key === 'Escape') setSelected(null); }}><button className="close" onClick={() => setSelected(null)} aria-label="Cerrar"><X/></button><span className="eyebrow">{selected.category} / ARCHIVO DE LA PROM</span><h2>{selected.title}</h2><p>{selected.label}.</p>{current ? <><a className="button" href={current.url} target="_blank" rel="noreferrer">Abrir {current.name}<ArrowUpRight size={18}/></a>{current.type.startsWith('image/') && <img className="preview" src={current.url} alt={selected.title}/>} {current.type.startsWith('video/') && <video className="preview" src={current.url} controls/>}{current.type === 'application/pdf' && <iframe className="pdf-preview" title={selected.title} src={current.url}/>}</> : <div className="empty-file"><FileText/><p>Este trabajo está esperando su archivo.</p><small>Archivo previsto: {selected.file}</small></div>}<button className="button secondary" onClick={() => input.current.click()}><Upload size={17}/> {current ? 'Cambiar archivo' : 'Añadir archivo, imagen o video'}</button><input ref={input} type="file" hidden onChange={attach} accept=".pdf,.ppt,.pptx,image/*,video/*"/><small className="local-note">Vista previa local. Los archivos se conservan durante esta sesión; no se suben a un servidor.</small></section></div>}
  </section>;
}

