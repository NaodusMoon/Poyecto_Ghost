from pathlib import Path
p=Path('src/components/PersonalStories.jsx');s=p.read_text(encoding='utf-8-sig').replace("title={'Historia de vida: '+current.title} {...current}","{...current} title={'Historia de vida: '+current.title}");p.write_text(s,encoding='utf-8')
p=Path('src/components/FinalChapter.jsx');s=p.read_text(encoding='utf-8-sig').replace('<div className="prom-film">', '<div className="prom-film" style={{width:"min(100%, 38.24vh)"}}>');p.write_text(s,encoding='utf-8')
