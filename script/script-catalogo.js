// Variáveis globais pq vou usar em varios lugares
const apiKey = 'ec7b7bc4b19c9ad9b313a59e3ced5dd6'
const baseUrl = 'https://api.themoviedb.org/3'
const langPtbr = 'pt-BR'

// showInfo(apiKey, baseUrl, langPtbr)

//----------------------------------------------------------------------------------------------------------------------

async function showInfo() {
  await insertThumbs(apiKey, baseUrl, langPtbr)
  showCatalogScreen()
}

async function insertThumbs(apiKey, baseUrl, langPtbr) {
  // Aqui vou pegar os dodos da API
  const moviesAndTvShows = await getDataAPI(apiKey, baseUrl, langPtbr)

  // Essa função vai ficar esperando o retorno da configuração das imagens
  const configsImg = await getConfigImg(apiKey, baseUrl)

  // o movies filtra do array tods os filmes
  const movies = filterByMedia('movie', moviesAndTvShows)

  // o tvshows filtra do array todas as series
  const tvShows = filterByMedia('tv', moviesAndTvShows)

  insertHTMLThumbs(configsImg, movies, 0)
  insertHTMLThumbs(configsImg, tvShows, 1)

  return
}

function getDataAPI(apiKey, baseUrl, langPtbr) {
  return fetch(
    `${baseUrl}/trending/all/week?api_key=${apiKey}&language=${langPtbr}&include_image_language=${langPtbr}`
  )
    .then(async responsePromise => {
      // peagar o resultado da API
      const responseMovies = await responsePromise.json()
      const moviesAndTvShows = responseMovies.results
      return moviesAndTvShows
    })
    .catch(error => {
      // Caso não de certo a chamada da API vai acionar o alerta do catch
      alert(
        'Infelizmente ocorreu um erro ao tentar carregar as informações dos filmes tente novamente!'
      )
    })
}

function getConfigImg(apiKey, baseUrl) {
  // É a chamada de ÁPI da configuração das imagens
  return fetch(`${baseUrl}/configuration?api_key=${apiKey}`)
    .then(async responsePromise => {
      // Aqui vai ficar aguardando a resposta da promise e assim que tiver os dados vai guardar no objeto json
      const responseAPIConfig = await responsePromise.json()
      const configsImg = responseAPIConfig.images
      return configsImg
    })
    .catch(error => {
      // Caso não de certo a chamada da API vai acionar o alerta do catch
      console.error('getConfigImg error', error)
    })
}

//filtrar o array pelo mediatype
function filterByMedia(mediaType, moviesAndTvShows) {
  return moviesAndTvShows.filter(function (movieOrTvShow) {
    return movieOrTvShow.media_type === mediaType
  })
}

// insere no html as thumbs
function insertHTMLThumbs(configsImg, moviesOrTvs, position) {
  for (let i = 0; i < 3; i++) {
    // guarda a url
    const moviePosterUrl = `${configsImg.base_url}${configsImg.poster_sizes[0]}${moviesOrTvs[i].poster_path}`
    // vai pegar a div e selecionar a imagen e inserir a source
    const getElementImg =
      document.getElementsByClassName('thumb-films-series')[position].children[
        i
      ]
    getElementImg.setAttribute('src', moviePosterUrl)
  }
}

function showCatalogScreen() {
  // Vai sair da tela de loading e abrir a tela de catálogo
  document.getElementById('catalogo').style.display = 'block'
  document.getElementById('initial-loading').style.display = 'none'
}
