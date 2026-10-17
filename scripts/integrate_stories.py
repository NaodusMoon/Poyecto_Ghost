from pathlib import Path
p=Path('src/components/ProjectLibrary.jsx');s=p.read_text(encoding='utf-8-sig').replace("import FinalChapter from './FinalChapter';","import FinalChapter from './FinalChapter';\nimport PersonalStories from './PersonalStories';")
start=s.index("{chapter.id === 'personal' && <div className=\"personal-content\">");end=s.index("{chapter.id === 'intereses'",start);s=s[:start]+"{chapter.id === 'personal' && <PersonalStories/>}"+s[end:];p.write_text(s,encoding='utf-8')
