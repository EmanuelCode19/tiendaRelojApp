import { Sequelize } from "sequelize";
import db from "../config/db.js";

export const Comprareloj = db.define('comprareloj',{
    nombreCliente:{
        type:Sequelize.STRING
    },
    cantidad:{
        type:Sequelize.STRING
    },
    nombreProducto:{
        type:Sequelize.STRING
    },
    precio:{
        type:Sequelize.STRING
    }

})