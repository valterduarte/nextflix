/* pegar dados na api
preciso dos detalhes de um filme especifico
*/

showMovieDetail()

//---------------------------------------------------------------------------------------------------------------------------

async function showMovieDetail() {
  const apiKey = 'ec7b7bc4b19c9ad9b313a59e3ced5dd6'
  const baseUrl = 'https://api.themoviedb.org/3'
  const langPtbr = 'pt-BR'

  const { search } = window.location
  const params = new URLSearchParams(search)
  const idFilms = params.get('id')

  const movieData = await getDataMovie(apiKey, baseUrl, langPtbr, idFilms)
  const configImgData = await getConfigImg(apiKey, baseUrl)

  const urlBannerSinopse = `${configImgData.base_url}${configImgData.logo_sizes[3]}${movieData.poster_path}`

  const getElementImg =
    document.getElementsByClassName('mini-banner')[0].children[0].children[0]

  getElementImg.setAttribute('src', urlBannerSinopse)

  const titleOnSinopseFilm = document.getElementById('mini-detail').children[0]
  titleOnSinopseFilm.innerHTML = movieData.title

  const popularityMatch = document.getElementsByTagName('p')[0].children[0]
  const integerPopularity = Math.round(movieData.popularity)

  popularityMatch.innerHTML = integerPopularity + ' Views'

  const yearOnSinopseFilm = document.getElementsByTagName('p')[0].children[1]
  yearOnSinopseFilm.innerHTML = movieData.release_date.split('-')[0]

  const durationFilm = document.getElementsByTagName('p')[0].children[3]
  durationFilm.innerHTML = movieData.runtime + 'm'

  const includeSinopse = document.getElementsByClassName('sinopse')[0]
  includeSinopse.innerHTML = movieData.overview

  const similarFilms = await getSimilarFilms(apiKey, baseUrl, langPtbr, idFilms)

  for (let i = 0; i < 3; i++) {
    const ThumbSimilarFilms = `${configImgData.base_url}${configImgData.poster_sizes[2]}${similarFilms.results[i].poster_path}`

    const divSimilarFilms = document.getElementById('lista-filmes-relacionados')
      .children[i].children[0]
    divSimilarFilms.setAttribute('src', ThumbSimilarFilms)

    const idMovieOrTv = similarFilms.results[i].id
    const urlMovieOrTv = `http://localhost:3000/detalhes.html?id=${idMovieOrTv}`
    const IdThumbsTagA = document.getElementById('lista-filmes-relacionados')
      .children[i]
    IdThumbsTagA.setAttribute('href', urlMovieOrTv)
  }
}

//---------------------------------------------------------------------------------------------------------------------------

async function getDataMovie(apiKey, baseUrl, langPtbr, idFilms) {
  return fetch(
    `${baseUrl}/movie/${idFilms}?api_key=${apiKey}&language=${langPtbr}&include_image_language=${langPtbr}`
  )
    .then(async responsePromise => {
      return await responsePromise.json()
    })
    .catch(error => {
      // Caso não de certo a chamada da API vai acionar o alerta do catch
      console.error('filmsDetail error', error)
    })
}

//---------------------------------------------------------------------------------------------------------------------------

async function getConfigImg(apiKey, baseUrl) {
  // É a chamada de ÁPI da configuração das imagens
  return fetch(`${baseUrl}/configuration?api_key=${apiKey}`)
    .then(async responsePromise => {
      // Aqui vai ficar aguardando a resposta da promise e assim que tiver os dados vai guardar no objeto json
      const configImgData = await responsePromise.json()
      return configImgData.images
    })
    .catch(error => {
      // Caso não de certo a chamada da API vai acionar o alerta do catch
      console.error('getConfigImg error', error)
    })
}
//------------------------------------------------------------------------------------------------------------------
function getSimilarFilms(apiKey, baseUrl, langPtbr, idFilms) {
  return fetch(
    `${baseUrl}/movie/${idFilms}/similar?api_key=${apiKey}&language=${langPtbr}&include_image_language=${langPtbr}`
  )
    .then(async responsePromise => {
      return await responsePromise.json()
    })
    .catch(error => {
      console.error('getSimilarFilms', error)
    })
}
