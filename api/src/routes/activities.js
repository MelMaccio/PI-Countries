const { Router } = require('express');
const router = Router();
const { Activity, Country, Op } = require('../db')

router.post('/', async (req, res) => {
   const { name, dificulty, duration, season, countryIds } = req.body;

   if (!name || !dificulty || !duration || !season) res.status(404).json({ msg: "Missing data" })

   try {
      const newAct = await Activity.create({ name, dificulty, duration, season })

      if (Array.isArray(countryIds)) {
         countryIds.forEach(async (id) => {
            const country = await Country.findByPk(id);
            if (country) {
               await newAct.addCountries(country)
            }
         })
      }else{
         const country = await Country.findByPk(countryIds);
         await newAct.addCountry(country)
      }

      res.json(newAct)

   } catch (error) {

      res.send(error)

   }

})


module.exports = router;