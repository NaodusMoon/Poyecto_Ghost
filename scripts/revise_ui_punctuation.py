from pathlib import Path
import re
pairs={
'Coincidir.<br/>Crecer.<br/><em>Florecer.</em>':'Coincidir,<br/>crecer,<br/><em>florecer</em>',
'Hay etapas que terminan.<br/><em>Y otras que se llevan dentro.</em>':'Hay etapas que terminan;<br/><em>y otras que se llevan dentro</em>',
'Tres historias.<br/><em>Una etapa compartida.</em>':'Tres historias,<br/><em>una etapa compartida</em>',
'Abre un capítulo.<br/><em>Descubre una parte de mí.</em>':'Abre un capítulo,<br/><em>descubre una parte de mí</em>',
'Ideas que piensan.<br/><em>Historias que construimos.</em>':'Ideas que piensan;<br/><em>historias que construimos</em>',
'Lo que nos inspira.<br/><em>Lo que nos espera.</em>':'Lo que nos inspira,<br/><em>lo que nos espera</em>',
'Un año.<br/><em>Todo lo que vivimos.</em>':'Un año,<br/><em>todo lo que vivimos</em>',
'Tres miradas.<br/><em>El futuro por escribir.</em>':'Tres miradas,<br/><em>el futuro por escribir</em>',
'Los días pasan.<br/><em>Esto se queda.</em>':'Los días pasan;<br/><em>esto se queda</em>',
'No hace falta volver atrás.<br/><em>A veces basta con darle play.</em>':'No hace falta volver atrás;<br/><em>a veces basta con darle play</em>',
'VOL. 01':'VOLUMEN 01',
'Fuimos un salón. Nos volvimos una historia.':'Fuimos un salón; nos volvimos una historia',
'Fotos que cuentan lo vivido.<br/>Ideas que merecen su propia presentación.':'Fotos que cuentan lo vivido;<br/>ideas que merecen su propia presentación',
'UN ARCHIVO DE LO QUE FUIMOS. UNA PISTA DE LO QUE SEREMOS.':'UN ARCHIVO DE LO QUE FUIMOS; UNA PISTA DE LO QUE SEREMOS',
'. Pulsa Reproducir para continuar.':'; pulsa Reproducir para continuar',
}
def clean(text):
 def join(m):
  word=m.group(2)
  return '; '+(word if word.isupper() else word[0].lower()+word[1:])
 text=re.sub(r'\.\s+([A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚÑáéíóúñ-]*)',lambda m:'; '+(m.group(1) if m.group(1).isupper() else m.group(1)[0].lower()+m.group(1)[1:]),text)
 text=re.sub(r'\.(\s*)$',r'\1',text)
 return text
for p in list(Path('src').rglob('*.jsx'))+list(Path('src').rglob('*.js')):
 s=p.read_text(encoding='utf-8-sig')
 for a,b in pairs.items():s=s.replace(a,b)
 def jsx(m):
  t=m.group(1)
  if re.search(r'[{}=]',t):return m.group(0)
  return '>'+clean(t)+'<'
 s=re.sub(r'>([^<>]+)<',jsx,s)
 def literal(m):
  t=m.group(1)
  if ('/' in t or '\\' in t or re.search(r'\.(pdf|pptx|mp4|webm|png|jpg|js|json|com|org)',t) or not re.search(r'[a-záéíóúñ]{3}',t)):
   return m.group(0)
  return "'"+clean(t)+"'"
 s=re.sub(r"'((?:[^'\\]|\\.)*)'",literal,s)
 p.write_text(s,encoding='utf-8')
