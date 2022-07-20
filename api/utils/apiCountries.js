//aca hago el fetch
//lo guardo en la base de datos
//con bulkCreate()
const axios = require('axios');
const { Country } = require('../src/db')


const apiInfo = async () => {
    const allApi = await axios.get('https://restcountries.com/v3/all')
    //console.log(allApi)
    const apiInfoDb = allApi.data.map(el => {
        return {
            id: el.cca3,
            name: el.name.common,
            flag: el.flags[0],
            continent: el.continents.map(c => c),
            capital:el.capital,
            subregion: el.subregion,
            area: el.area,
            population: el.population,
        }
    })
    //console.log(apiInfoDb)
    await Country.bulkCreate(apiInfoDb)
}

module.exports= apiInfo;