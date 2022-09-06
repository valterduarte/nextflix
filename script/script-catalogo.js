fetch(
  'https://api.themoviedb.org/3/trending/movie/week?api_key=ec7b7bc4b19c9ad9b313a59e3ced5dd6&language=pt-BR'
)
  .then(async response => {
    const movies = await response.json()
    //console.log(movies.results)
    showSuccess(movies.results)
  })
  .catch(error => {
    alert('Infelizmente ocorreu um erro tente novamente !')
  })

function showSuccess(results) {
  document.getElementById('catalogo').style.display = 'block'
  document.getElementById('initial-loading').style.display = 'none'

  results.forEach(element => {
    console.log(element.title)
  })
}
