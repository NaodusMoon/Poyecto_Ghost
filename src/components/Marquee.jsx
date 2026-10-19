import React from 'react';

const phrases = [
  'UN SUEÑO NO ES LA REALIDAD... Y, ¿QUIÉN TE DICE CUÁL ES CUÁL?',
  'ESTÁS LOCO, PERO TE DIRÉ UN SECRETO... LAS MEJORES PERSONAS LO ESTÁN',
  'NUNCA PIERDAS TU MUCHOSIDAD',
  'NO ESTOY LOCO... MI REALIDAD SIMPLEMENTE ES DIFERENTE... A LA TUYA',
  'SI VAS A LLEGAR A LA CIMA... AGÁRRATE A ESTA ROCA... Y AGÁRRATE A TI MISMO',
  'IMAGINACIÓN ES LA ÚNICA ARMA... EN LA GUERRA CONTRA LA REALIDAD',
  'NO PUEDES VIVIR TU VIDA... COMPLACIENDO A LOS DEMÁS... LA ELECCIÓN DEBE SER TUYA',
  '¿CUÁNTO ES PARA SIEMPRE?... A VECES SOLO UN SEGUNDO',
];

export default function Marquee({ reverse = false }) {
  return <div className={'marquee marquee-quotes' + (reverse ? ' marquee-reverse' : '')} role="region" aria-label={phrases.join(' • ')}>
    <div aria-hidden="true">{[0, 1].map(copy => <span className="marquee-phrase-group" key={copy}>{phrases.map(phrase => <span key={phrase}>{phrase}<b>✳</b> </span>)}</span>)}</div>
  </div>;
}
