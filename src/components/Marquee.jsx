import React from 'react';

export default function Marquee({ reverse = false }) {
  return <div className={'marquee' + (reverse ? ' marquee-reverse' : '')} aria-label="Nuestra historia apenas comienza">
    <div aria-hidden="true">{Array.from({ length: 4 }, (_, i) => <span key={i}>NUESTRA HISTORIA APENAS COMIENZA <b>✳</b> PROM 2026 <b>✳</b> KEEP BLOOMING <b>✳</b> </span>)}</div>
  </div>;
}
