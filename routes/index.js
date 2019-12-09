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

//autenticacion
router.post('/login', ControlLogin.login);
//maestro
router.get('/maestro',token.checkToken, ControlMaestro.obtenerDatos);
router.get('/maestro/clases',token.checkToken,ControlRA_maestro.obtenerClases);
router.post('/maestro/iniciarClase',token.checkToken,ControlRA_maestro.iniciarClase);
router.get('/maestro/comprobarClaseIniciada',token.checkToken,ControlRA_maestro.comprobarClaseIniciada)
router.post('/maestro/registrarAsistencia',token.checkToken,ControlRA_maestro.registrarAsistencia);
router.post('/maestro/finalizarClase',token.checkToken,ControlRA_maestro.finalizarClase);
router.post('/maestro/eliminarAsistencia',token.checkToken,ControlRA_maestro.eliminarAsistencia);
//maestro/reportes
router.get('/maestro/reporte/:id',token.checkToken,ControlReportesAs.obtenerReporte);
//maestro/horario
router.get('/maestro/horario/',token.checkToken,ControlMaestro.obtenerHorario);
//estudiantes
router.get('/estudiante/comprobarClaseIniciada',token.checkToken,ControlRA_alumno.comprobarClaseIniciada);
router.post('/estudiante/registrarAsistencia',token.checkToken,ControlRA_alumno.registrarAsistencia);
//estudiante/horario
router.get('/estudiante/horario/',token.checkToken,ControlAlumno.obtenerHorario);

module.exports=router;