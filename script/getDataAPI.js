export function getDataAPI(apiKey, baseUrl, langPtbr, timeWindow) {
  return fetch(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}&language=${langPtbr}&include_image_language=${langPtbr}`
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
