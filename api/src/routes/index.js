const { Router } = require('express');

// const { Country, Activity } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router(); 

const countriesRouter = require('./countries')
const activitiesRouter = require('./activities')

router.use('/countries', countriesRouter);
router.use('/activities', activitiesRouter);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



module.exports = router;

