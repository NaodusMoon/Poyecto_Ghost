$ErrorActionPreference='Stop'
$root='C:/Users/NaodusMoon/Downloads/Proyecto_Ghost'
$items=@(
 @{Name='PRESENTACIÓN SISTEMA EXPERTO.pptx'; Slug='sistema-experto'},
 @{Name='PRESENTACIÓN MODELO IA ( exposición).pptx'; Slug='modelo-ia'}
)
$app=New-Object -ComObject PowerPoint.Application
try {
 foreach ($item in $items) {
  $source=Join-Path 'C:/Users/NaodusMoon/Downloads' $item.Name
  $folder=Join-Path $root ('tmp/section-04/'+$item.Slug)
  New-Item -ItemType Directory -Force $folder | Out-Null
  Copy-Item -LiteralPath $source -Destination (Join-Path $root ('public/media/seccion-04/'+$item.Slug+'.pptx'))
  $deck=$app.Presentations.Open($source,$true,$false,$false)
  try {
   Write-Output ($item.Slug+' slides: '+$deck.Slides.Count)
   for ($i=1;$i -le $deck.Slides.Count;$i++) {
    $slide=$deck.Slides.Item($i)
    $slide.Export((Join-Path $folder ($i.ToString('000')+'.png')),'PNG',1920,1080)
   }
  } finally {$deck.Close()}
 }
} finally {$app.Quit(); [System.Runtime.InteropServices.Marshal]::ReleaseComObject($app) | Out-Null}
