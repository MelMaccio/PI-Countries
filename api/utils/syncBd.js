
const { conn } = require('../src/db.js');
const apiInfo = require('./apiCountries');


conn.sync({ force: true }).then(() => {
    apiInfo().then(() => {
    })
  });