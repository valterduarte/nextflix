export async function getSimilarFilms(apiKey, baseUrl, langPtbr, idFilms) {
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
