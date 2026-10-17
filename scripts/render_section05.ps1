$ErrorActionPreference='Stop'
$root='C:/Users/NaodusMoon/Downloads/Proyecto_Ghost'
$folder=Join-Path $root 'tmp/section-05/vida-tatiana'
New-Item -ItemType Directory -Force $folder | Out-Null
$source='C:/Users/NaodusMoon/Downloads/PRESENTACIÓN PROYECTO DE VIDA.pptx'
Copy-Item -LiteralPath $source -Destination (Join-Path $root 'public/media/seccion-05/vida-tatiana.pptx')
$app=New-Object -ComObject PowerPoint.Application
try{
 $deck=$app.Presentations.Open((Join-Path $root 'public/media/seccion-05/vida-tatiana.pptx'),$true,$false,$false)
 try{
  $height=[int](1920*$deck.PageSetup.SlideHeight/$deck.PageSetup.SlideWidth)
  Write-Output ('Slides: '+$deck.Slides.Count)
  for($i=1;$i -le $deck.Slides.Count;$i++){$deck.Slides.Item($i).Export((Join-Path $folder ($i.ToString('000')+'.png')),'PNG',1920,$height)}
 }finally{$deck.Close()}
}finally{$app.Quit();[System.Runtime.InteropServices.Marshal]::ReleaseComObject($app)|Out-Null}

