import express from "express";
import { paginaDeInicio,paginaNosotros,paginaRelojes,paginaTestimoniales,paginaDetalleReloj,guardarReloj } from "../controllers/paginasController.js";
import { guardarTestimonial } from "../controllers/testimonialController.js";
const router = express.Router();

router.get('/',paginaDeInicio)

router.get('/nosotros',paginaNosotros)

router.get('/relojes',paginaRelojes)

router.get('/reloj/:slug',paginaDetalleReloj)

router.get('/testimoniales',paginaTestimoniales)

router.post('/testimoniales',guardarTestimonial)

router.post('/reloj',guardarReloj)

export default router;
