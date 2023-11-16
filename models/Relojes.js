import Sequelize from 'sequelize'
import db from '../config/db.js'

export const Relojes = db.define('relojes',{
    nombre:{
        type:Sequelize.STRING
    },
    precio:{
        type:Sequelize.STRING
    },
    cantidad:{
        type: Sequelize.STRING
    },
    descripcion:{
        type:Sequelize.STRING
    },
    imagen:{
        type:Sequelize.STRING
    },
    slug: {
        type:Sequelize.STRING
    }
})