const fetch = require('node-fetch')

const getData = url => {
  return fetch(url)
    .then(res => res.json())
    .catch(_ => null)
}

module.exports = getData
