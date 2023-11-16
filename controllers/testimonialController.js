import { Testimonial } from "../models/testimonial.js";

const guardarTestimonial = async(req,res) => {

    const {nombre, correo, mensaje} = req.body;

    const errores = []
    if(nombre.trim() === ''){
        errores.push({mensaje : 'El nombre esta vacio'})
    }
    if(correo.trim() === ''){
        errores.push({mensaje : 'El correo esta vacio'})
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje : 'El mensaje esta vacio'})
    }

    if(errores.length > 0){

        const testimonial = await Testimonial.findAll()

        res.render('testimoniales',{
            pagina: 'testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimonial
        })
    }else { //almacenar en la base de datos

        try{
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })

            res.redirect('/testimoniales')
        }catch(error){
            console.log(error)
        }

    }
}
export{
    guardarTestimonial
}