const apiKey = 'ec7b7bc4b19c9ad9b313a59e3ced5dd6'
const baseUrl = 'https://api.themoviedb.org/3'
const langPtbr = 'language=pt-BR'
getDataAPI(apiKey, baseUrl, langPtbr)

function getDataAPI(apiKey, baseUrl, langPtbr) {
  fetch(`${baseUrl}/trending/movie/week?api_key=${apiKey}&language=${langPtbr}`)
    .then(async responsePromise => {
      const responseMovies = await responsePromise.json()
      const movies = responseMovies.results
      showSuccess(movies)
    })
    .catch(error => {
      alert(
        'Infelizmente ocorreu um erro ao tentar carregar as informações dos filmes tente novamente!'
      )
    })
}

async function showSuccess(movies) {
  document.getElementById('catalogo').style.display = 'block'
  document.getElementById('initial-loading').style.display = 'none'

  const configsImg = await getConfigImg(apiKey, baseUrl)

  for (let i = 0; i < 3; i++) {
    const moviePosterUrl = `${configsImg.base_url}${configsImg.poster_sizes[0]}${movies[i].poster_path}`
    const getElementImg =
      document.getElementsByClassName('thumb-films-series')[0].children[i]
    getElementImg.setAttribute('src', moviePosterUrl)

    console.log(getElementImg)
  }
}

function getConfigImg(apiKey, baseUrl) {
  return fetch(`${baseUrl}/configuration?api_key=${apiKey}`)
    .then(async responsePromise => {
      const responseAPIConfig = await responsePromise.json()
      const configsImg = responseAPIConfig.images
      return configsImg
    })
    .catch(error => {
      console.error('getConfigImg error', error)
    })
}
