export async function getConfigImg(apiKey, baseUrl) {
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
