const apiKey = 'ec7b7bc4b19c9ad9b313a59e3ced5dd6'
const baseUrl = 'https://api.themoviedb.org/3'
const langPtbr = 'language=pt-BR'
getDataAPI(apiKey, baseUrl, langPtbr)

function getDataAPI(apiKey, baseUrl) {
  fetch(
    `${baseUrl}/trending/movie/week?api_key=${baseUrl}&language=${langPtbr}`
  )
    .then(async responsePromise => {
      const responseMovies = await responsePromise.json()
      const movies = responseMovies.results
      showSuccess(movies)
    })
    .catch(error => {
      alert('Infelizmente ocorreu um erro tente novamente !')
    })
}

function showSuccess(movies) {
  document.getElementById('catalogo').style.display = 'block'
  document.getElementById('initial-loading').style.display = 'none'

  for (let i = 0; i < 3; i++) {
    console.log(movies[i])
    console.log(movies[i].poster_path)

    //  tenha que pegar a img do filme
    //  tenho que pegar a tag img no html
    //  colocar a img ena div
  }

  /* movies.forEach(movie => {
    const movieImg = movie.poster_path
    const movieDivPosters =
      document.getElementsByClassName('thumb-films-series')[0]
    const movieImgTags = movieDivPosters.children
    console.log(movieImgTags)
  })*/
}

function getConfigAPI() {
  fetch(
    'https://api.themoviedb.org/3/trending/movie/week?api_key=ec7b7bc4b19c9ad9b313a59e3ced5dd6&language=pt-BR'
  )
    .then(async responsePromise => {
      const responseMovies = await responsePromise.json()
      const movies = responseMovies.results
      showSuccess(movies)
    })
    .catch(error => {
      alert('Infelizmente ocorreu um erro tente novamente !')
    })
}
