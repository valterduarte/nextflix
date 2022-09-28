const apiKey = 'ec7b7bc4b19c9ad9b313a59e3ced5dd6'
const baseUrl = 'https://api.themoviedb.org/3'
const langPtbr = 'pt-BR'
getDataAPI(apiKey, baseUrl, langPtbr)

function getDataAPI(apiKey, baseUrl, langPtbr) {
  fetch(
    `${baseUrl}/trending/all/week?api_key=${apiKey}&language=${langPtbr}&include_image_language=${langPtbr}`
  )
    .then(async responsePromise => {
      const responseMovies = await responsePromise.json()
      const moviesAndTvShows = responseMovies.results
      showSuccess(moviesAndTvShows)
    })
    .catch(error => {
      alert(
        'Infelizmente ocorreu um erro ao tentar carregar as informações dos filmes tente novamente!'
      )
    })
}

async function showSuccess(moviesAndTvShows) {
  document.getElementById('catalogo').style.display = 'block'
  document.getElementById('initial-loading').style.display = 'none'

  const configsImg = await getConfigImg(apiKey, baseUrl)

  const movies = filterByMedia('movie', moviesAndTvShows)
  const tvShows = filterByMedia('tv', moviesAndTvShows)

  insertHTMLThumbs(configsImg, movies, 0)
  insertHTMLThumbs(configsImg, tvShows, 1)
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

function filterByMedia(mediaType, moviesAndTvShows) {
  return moviesAndTvShows.filter(function (movieOrTvShow) {
    return movieOrTvShow.media_type === mediaType
  })
}

function insertHTMLThumbs(configsImg, moviesOrTvs, position) {
  for (let i = 0; i < 3; i++) {
    const moviePosterUrl = `${configsImg.base_url}${configsImg.poster_sizes[0]}${moviesOrTvs[i].poster_path}`
    const getElementImg =
      document.getElementsByClassName('thumb-films-series')[position].children[
        i
      ]
    getElementImg.setAttribute('src', moviePosterUrl)
  }
}
