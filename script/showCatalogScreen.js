export function showCatalogScreen(idName) {
  // Vai sair da tela de loading e abrir a tela que for passada por parâmetro
  document.getElementById(idName).style.display = 'block'
  document.getElementById('initial-loading').style.display = 'none'
}
