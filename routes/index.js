const express=require('express');
const router=express.Router();
const token= require("../api/token")

const ControlAlumno = require("../api/controllers/ControlAlumno");
const ControlAsistencia = require("../api/controllers/ControlAsistencia");
const ControlGA = require("../api/controllers/ControlGA");
const ControlLogin = require("../api/controllers/ControlLogin");
const ControlMaestro = require("../api/controllers/ControlMaestro");
const ControlRA_alumno = require("../api/controllers/ControlRA_alumno");
const ControlRA_maestro = require("../api/controllers/ControlRA_maestro");
const ControlReportesAs = require("../api/controllers/ControlReportesAs");

router.post('/login', ControlLogin.login);
router.get('/maestro',token.checkToken, ControlMaestro.obtenerDatos);
router.get('/maestro/clases',token.checkToken,ControlRA_maestro.obtenerClases);
router.post('/maestro/iniciarClase',token.checkToken,ControlRA_maestro.iniciarClase);
router.post ('/maestro/finalizarClase',token.checkToken,ControlRA_maestro.iniciarClase);
router.get('/maestro/comprobarClaseIniciada',token.checkToken,ControlRA_maestro.comprobarClaseIniciada)

module.exports=router;