import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react';
import FlowerScene from './components/FlowerScene';
import ProjectLibrary from './components/ProjectLibrary';
import ChapterMap from './components/ChapterMap';
import Marquee from './components/Marquee';

const photo = '/media/personal/portada-prom-completa.jpg';
export default function App() {
  const [menu, setMenu] = useState(false);
  return <><div className="topline">UN CAPÍTULO QUE SIEMPRE VAMOS A GUARDAR <span>卒業生 2026 · HECHO DE RECUERDOS</span></div>
    <header><a href="#" className="brand"><span className="brand-flower">✳</span><span>A TRAVÉS DEL ESPEJO<small>ANUARIO · PROM 2026</small></span></a><button className="mobile-menu" onClick={() => setMenu(!menu)} aria-label={menu ? "Cerrar navegación" : "Abrir navegación"} aria-expanded={menu} aria-controls="site-navigation">{menu ? <X/> : <Menu/>}</button><nav id="site-navigation" className={menu ? 'site-navigation open' : 'site-navigation'}>{[['Inicio', '#inicio'], ['Capítulos', '#capitulos'], ['Proyectos', '#proyectos'], ['Académico', '#academico'], ['Recuerdos', '#recuerdos']].map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}</nav><a className="header-button" href="#proyectos">Nuestro universo <ArrowUpRight size={16}/></a></header>
    <main><section className="hero" id="inicio"><div className="hero-copy"><h1>Coincidir,<br/>crecer,<br/><em>florecer</em><span className="title-star">✧</span></h1><p>Fuimos un salón; nos volvimos una historia<br/> Este es nuestro pequeño universo de ideas,<br className="desktop"/> sueños y momentos que se quedan</p><a className="button" href="#proyectos">Explora nuestra prom <ArrowUpRight size={20}/></a><div className="hero-bottom"><a href="#nosotros" aria-label="Descubrir más"><ArrowDown size={18}/></a></div></div>
      <div className="hero-collage"><div className="vertical-japanese">思い出が、花になる。</div><div className="photo-frame"><div className="portrait-crop"><img src={photo} alt="Tres compañeras en un mundo de fantasía, portada del anuario Prom 2026"/></div><div className="photo-overlay">the best is<br/><i>yet to bloom</i></div><span className="photo-caption">MI HISTORIA / PROM 2026</span></div><div className="round-sticker">UN MISMO<br/><b>2026</b><br/>MIL CAMINOS</div><div className="flower-wrap"><FlowerScene/></div><span className="handwritten">lo bonito de<br/>crecer juntos ↗</span><div className="prom-ticket"><span>PROM<br/><strong>20<br/>26</strong></span></div><div className="collage-foot">A TRAVÉS DEL ESPEJO <span>NUESTRAS HISTORIAS · PROM 2026</span></div></div>
    </section>
    <Marquee/>
    <section className="intro section" id="nosotros"><div><h2>Hay etapas que terminan;<br/><em>y otras que se llevan dentro</em></h2></div><div className="intro-text"><span className="mini-flower">✳</span><p>Bienvenidos a nuestro anuario digital; aquí viven nuestros proyectos, las cosas que aprendimos y todo eso que nos hizo crecer juntos</p><p>A través del espejo nos encontramos con quienes fuimos, con las personas y los pequeños momentos que hicieron brillar esta etapa</p><span className="signature">Con cariño, la prom ♡</span></div></section>
    <ChapterMap/>
    <ProjectLibrary/>
    <section className="closing"><h2>Sigamos <em>floreciendo</em> ✳</h2><a href="#inicio">Volver al comienzo ↗</a></section><Marquee/></main>
    <footer><a href="#" className="brand">✳ A TRAVÉS DEL ESPEJO</a><span>UN ARCHIVO DE LO QUE FUIMOS; UNA PISTA DE LO QUE SEREMOS</span><small>PROM 2026 ©</small></footer>

  </>;
}





