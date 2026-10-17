import { useState } from 'react';

export function readSaved(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
export default function useLocalState(key, initial) {
  const [value, setValue] = useState(() => readSaved(key, initial));
  const [error, setError] = useState('');
  const update = next => {
    setValue(next);
    try { localStorage.setItem(key, JSON.stringify(next)); setError(''); }
    catch { setError('No se pudo guardar en este navegador; tu cambio sigue disponible durante esta sesión'); }
  };
  return [value, update, error];
}
