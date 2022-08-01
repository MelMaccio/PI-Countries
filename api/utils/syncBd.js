
const { conn } = require('./src/db.js');
const apiInfo = require('./utils/apiCountries');


conn.sync({ force: true }).then(() => {
    apiInfo().then(() => {
    })
  });