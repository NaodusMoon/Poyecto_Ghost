import React, { useState } from 'react';
import useLocalState from './useLocalState';
export default function InterestLinks(){
 const [links,save,error]=useLocalState('komorebi-interest-links',['','']);
 const [draft,setDraft]=useState(links); const [notice,setNotice]=useState('');
 return <div className="interest-extras"><div><span className="eyebrow">DOS VENTANAS A MI TEMA FAVORITO</span><h3>Para seguir explorando ↗</h3><p>Añade dos direcciones relacionadas con tu tema de interés.</p><div className="interest-saved">{links.map((url,i)=>url ? <a className="button secondary" key={i} href={url} target="_blank" rel="noreferrer">Explorar recurso {i+1} ↗</a>:<span className="pending-tag" key={i}>Dirección {i+1} pendiente</span>)}</div></div><form onSubmit={e=>{e.preventDefault();if(draft.some(url=>url && !/^https?:\/\//i.test(url))){setNotice('Usa direcciones que empiecen por https:// o http://.');return;}save(draft);setNotice('Enlaces guardados en este navegador.');}}>{draft.map((url,i)=><label key={i}>Dirección {i+1}<input type="url" value={url} placeholder="https://…" onChange={e=>setDraft(draft.map((v,n)=>n===i?e.target.value:v))}/></label>)}<button className="button" type="submit">Guardar direcciones</button><small role="status">{error || notice}</small></form></div>
}
