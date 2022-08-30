fetch(
  'https://api.themoviedb.org/3/movie/550?api_key=ec7b7bc4b19c9ad9b313a59e3ced5dd6'
)
  .then(response => {
    response.json()
  })
  .catch(error => {})
