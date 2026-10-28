import React, { useRef, useState } from 'react';
import AdaptiveVideo from './AdaptiveVideo';
import stories from '../data/stories.json';
const clock=t=>`${Math.floor(t/60).toString().padStart(2,'0')}:${(t%60).toString().padStart(2,'0')}`;
export default function PersonalStories(){
 const [active,setActive]=useState('original');const [moment,setMoment]=useState(null);const [notice,setNotice]=useState('');const video=useRef(null);
 const current=stories.find(item=>item.id===active);const number={original:'01',laura:'02'}[active];
 const cv = active === 'laura' ? {pdf:'/media/personal/hoja-de-vida.pdf',preview:'/media/personal/hoja-1.png'} : {pdf:'/media/personal/hoja-de-vida-estefani.pdf',preview:'/media/personal/hoja-estefani-1.png'};
 const choose=id=>{setActive(id);setMoment(null);setNotice('');};
 const seek=async time=>{if(!video.current)return;setMoment(time);try{video.current.currentTime=time;await video.current.play();setNotice('Reproduciendo desde '+clock(time));}catch{setNotice('Momento seleccionado; pulsa Reproducir para continuar');}};
 const reel=<aside className="profile-reel"><div className="profile-reel-heading"><h5>Las escenas<br/><em>que me cuentan</em></h5></div><div className="profile-scenes">{current.moments.map((scene,i)=><figure key={scene.src}><button onClick={()=>seek(scene.time)} aria-label={'Ver momento '+(i+1)+' de '+current.title+' en '+clock(scene.time)} aria-pressed={moment===scene.time}><img src={scene.src} loading="lazy" alt={'Fotograma de la historia de '+current.title+' en '+clock(scene.time)}/><span>▶ {clock(scene.time)}</span></button><figcaption>RECUERDO 0{i+1} <b>↗</b></figcaption></figure>)}</div><span className="profile-reel-status" role="status">{notice}</span></aside>;
 return <div className="personal-stories">
  <div className="stories-intro"><h3>Dos historias,<br/><em>una etapa compartida</em></h3></div>
  <div className="story-selectors" role="group" aria-label="Elegir historia de vida">{[...stories].sort((a,b)=>['original','laura'].indexOf(a.id)-['original','laura'].indexOf(b.id)).map((item,i)=><button key={item.id} aria-pressed={item.id===active} onClick={()=>choose(item.id)}><span>0{i+1}</span><div>{item.title}<small>{item.width===576?'Vertical · 9:16':item.width===1280?'Horizontal · 16:9':'Formato original · 384 × 368'}{['original','laura'].includes(item.id)?' · Hoja de vida':''}</small></div><b>↗</b></button>)}</div>
  <div className={'selected-profile '+(cv?'profile-laura ':'')+(active==='original'?'profile-wide':'')}>
   <div className="profile-title"><div><h4 aria-live="polite">{current.title}</h4></div><div className="profile-archive-mark" aria-hidden="true"><b>{number}</b><span>PROM 2026<br/>ARCHIVO PERSONAL</span></div></div>
   <div className="profile-media"><div className="profile-video"><div className="profile-film-caption"><span className="eyebrow">MI HISTORIA EN VIDEO</span><em>lo que fui, lo que soy ↘</em></div><AdaptiveVideo key={current.id} mediaRef={video} {...current} title={'Historia de vida: '+current.title}/></div>
    {cv?<div className="profile-cv"><a className="cv-document" href={cv.pdf} target="_blank" rel="noreferrer" aria-label={'Abrir hoja de vida de '+current.title+' en PDF'}><img src={cv.preview} alt={'Hoja de vida de '+current.title} width="894" height="1264" loading="lazy"/></a><a className="profile-cv-link" href={cv.pdf} target="_blank" rel="noreferrer">Leer o descargar hoja de vida de {current.title} ↗</a></div>:reel}
   </div>
   {cv&&reel}
   <div className="profile-signoff"><span>CAPÍTULO {number} / NUESTRAS HISTORIAS</span><p>Crecer también es guardar<br/><em>un poquito de cada etapa</em></p><b>✳</b></div>
  </div>
 </div>;
}
