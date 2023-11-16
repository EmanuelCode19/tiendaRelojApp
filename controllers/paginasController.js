import { Viaje } from "../models/Viaje.js"
import { Testimonial } from "../models/testimonial.js"
import { Relojes } from "../models/Relojes.js"
import  Sequelize  from "sequelize"
const paginaDeInicio = async (req,res) => { // req -- lo que enviamos : res -- lo que nos responde express
    
    const promiseDB = []

    promiseDB.push(Viaje.findAll({limit: 3}))
    promiseDB.push(Relojes.findAll({limit:3}))
    try{

        const resultado = await Promise.all(promiseDB)
      
        res.render('inicio',{
            pagina: 'Inicio',
            clase: "home",
            viajes: resultado[0],
            relojes: resultado[1]
        })
    } catch (error) {
        console.log(error)
    }
}

const paginaNosotros = (req,res) => {
    res.render('nosotros',{
        paginas: 'Nosotros'
    })
}

const paginaRelojes = async (req,res) => {
    //consultar bd
    const relojes = await Relojes.findAll()

    res.render('relojes',{
        pagina: 'relojes',
        relojes,
    })
}

const paginaDetalleReloj = async  (req,res) => {

    const {slug} = req.params;

    try {
        const reloj = await Relojes.findOne({where: {slug}})

        res.render('reloj',{
            pagina: 'Informacion de reloj',
            reloj
        })
    } catch (error) {
        console.log(error
            )
    }

}

const paginaTestimoniales = async (req,res) => {
   try{
    const testimonial = await Testimonial.findAll()


    res.render('testimoniales',{
        pagina: 'Testimoniales',
        testimonial
    })
   }catch (error){
    console.log(error)
   }
}

const guardarReloj = async (req,res) => {
    const {nombre,quantity} = req.body;
    const {slug} = req.params;

    try {
        const relojs = await Relojes.findOne({where: {slug}})

        
    res.render('reloj',{
        nombre,
        quantity,
        relojs
    })

    res.redirect(`${nombre}${quantity}${relojs}`)
       
    } catch (error) {
        console.log(error
            )
    }


    
}

export {
    paginaDeInicio,
    paginaNosotros,
    paginaRelojes,
    paginaTestimoniales,
    paginaDetalleReloj,
    guardarReloj
}