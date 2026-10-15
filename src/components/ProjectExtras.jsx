import React, { useState } from 'react';
import useLocalState from './useLocalState';
export default function ProjectExtras({title}){
 const [media,setMedia]=useState({});
 const [canva,save,error]=useLocalState('komorebi-canva','');
 const [draft,setDraft]=useState(canva);const [notice,setNotice]=useState('');
 const attach=(kind,file)=>{if(!file)return;if(media[kind])URL.revokeObjectURL(media[kind].url);setMedia(v=>({...v,[kind]:{url:URL.createObjectURL(file),name:file.name}}));};
 return <div className="project-extras"><h3>La historia detrás del trabajo</h3><p>Acompaña tu entrega con una imagen y un video.</p>{['imagen','video'].map(kind=><div key={kind}><label className="media-upload">Añadir {kind}<input type="file" accept={kind==='imagen'?'image/*':'video/*'} onChange={e=>attach(kind,e.target.files[0])}/></label>{media[kind] && (kind==='imagen'?<img className="preview" src={media[kind].url} alt={'Imagen de '+title}/>:<video className="preview" src={media[kind].url} controls/>)}</div>)}{title==='Proyecto de vida' && <form onSubmit={e=>{e.preventDefault();try{const url=new URL(draft);if(url.protocol!=='https:' || !(url.hostname==='canva.com'||url.hostname.endsWith('.canva.com')))throw Error();save(url.href);setNotice('Enlace guardado en este navegador.');}catch{setNotice('Introduce un enlace https:// de canva.com.');}}}><label className="letter-label">O enlaza tu presentación de Canva<input type="url" required value={draft} onChange={e=>setDraft(e.target.value)} placeholder="https://www.canva.com/design/…"/></label><button className="button" type="submit">Guardar enlace</button>{canva && <a className="button secondary" href={canva} target="_blank" rel="noreferrer">Ver proyecto en Canva ↗</a>}<p role="status">{error||notice}</p></form>}</div>;
}
