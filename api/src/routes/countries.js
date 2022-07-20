const { Router } = require('express');
const router = Router();
const { Country, Activity, Op} = require('../db')

router.get('/', async (req, res) => {
    const name = req.query.name
   // const filter = req.query.filter
    try {
        if(name){
            try {
                const countries = await Country.findAll({
                    where : {
                        name : {
                            [Op.iLike] : '%' + name + '%'
                        }
                    }
               });
               res.json(countries.length ? countries : "Not found")
            } catch (error) {
               res.status(404).send(error)
            }
        }else{
            const countries = await Country.findAll(req.query);
            res.status(200).json(countries)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})
router.get('/:id', async (req,res)=>{
    const id = req.params.id
    
    try {
        const country = await Country.findOne({
            where: {
                id: {[Op.iLike]: `%${id}`}
            },
            include: [{
                model: Activity,
                attributes: ['name', 'dificulty', 'duration', 'season'],
                through: { attributes: []}
            }]
        },
        )
        
        res.json(country ? country : 'Incorrect Id')

    } catch (error) {

        res.status(404).send(error)
    }
})


module.exports = router;