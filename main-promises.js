const fetchData = require('./fetchData')
const API = 'https://rickandmortyapi.com/api/character/';

fetchData(API)
  .then(data => {console.log(data.info.count);
  return fetchData(`${API}${data.results[0].id}`)
  })
  .then(data => {console.log(data.name);return fetchData(data.origin.url)
  })
  .then(data => {console.log(data.dimension);return})
  .catch(err => console.error(err))