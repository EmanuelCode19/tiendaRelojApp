import { Testimonial } from "../models/Testimonial.js"
import { Relojes } from "../models/Relojes.js"
import { Comprareloj } from "../models/Comprareloj.js"
import  Sequelize  from "sequelize"
const paginaDeInicio = async (req,res) => { // req -- lo que enviamos : res -- lo que nos responde express
    
    const promiseDB = []

    promiseDB.push(Relojes.findAll({limit:3}))
    try{

        const resultado = await Promise.all(promiseDB)
      
        res.render('inicio',{
            pagina: 'Inicio',
            clase: "home",
            relojes: resultado[0]
        })
    } catch (error) {
        console.log(error)
    }
}

const paginaNosotros = (req,res) => {
    res.render('nosotros',{
        pagina: 'Nosotros'
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
    const {reloj,precio,nombre,quantity} = req.body;
    const {slug} = req.params;

    const errores = []
    if(nombre.trim() === ''){
        errores.push({mensaje : 'El nombre esta vacio'})
    }
    if(quantity.trim() === ''){
        errores.push({mensaje : 'la cantida esta vacio'})
    }

    if(errores.length > 0){

    const reloj = await Relojes.findOne({where: {slug}})

     res.render(`reloj`,{
        errores,
        reloj
     })
    }else{
        try {  
     
            const relog = await Relojes.findOne({where: {slug}})
            const incrementResult = await relog.decrement('cantidad',{by: quantity})

            
            
            await Comprareloj.create({
                nombreCliente: nombre,
                cantidad: quantity,
                nombreProducto:reloj,
                precio: precio
            })   
            
            res.redirect(`https://wa.me/18098219146?text=Hola, soy ${nombre} quiero procesar la compra de ${quantity} unidades del reloj: ${reloj} precio: ${precio}`)
           
        } catch (error) {
            console.log(error
                )
        }
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