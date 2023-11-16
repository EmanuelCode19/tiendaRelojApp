import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from 'dotenv/config';

const app = express();

//conectar db 

db.authenticate()
    .then(() => console.log('base de datos conectada'))
    .catch(error => console.error(error))
//habilitar pug

app.set('view engine','pug');

//middlewares obtener el year actual

app.use((req,res,next)=> {
    res.locals.year = new Date().getFullYear()  
    res.locals.title = "Agencia de Viajes"
     next();
})
//agregar body parser

app.use(express.urlencoded({extended: true}));

//definir la carpeta publica

app.use('/',router)

app.use(express.static('public'));

const port = process.env.PORT || 4000;

app.listen(port,() => {
    console.log(`express esta corriendo en el puerto ${port}`)
})