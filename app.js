const express=require('express');
const app=express();
const path=require('path');
const morgan=require('morgan');
const mongoose=require('mongoose');
const cors = require('cors')

//conectar a la BD
mongoose.connect('mongodb://localhost/MiAsistencia',  { useNewUrlParser: true }  ).
then(db=>console.log('Conectado a BD'))
.catch(err=>console.log(err));

//importacion de rutas
const indexRoutes=require('./routes/index');

//configuraciones
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//rutas
app.use('/',indexRoutes);

//inciando server
app.listen(app.get('port'), ()=>{
    console.log(`Servidor escuchando en ${app.get('port')}` );
});