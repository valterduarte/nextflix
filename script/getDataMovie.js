export async function getDataMovie(apiKey, baseUrl, langPtbr, idFilms) {
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
