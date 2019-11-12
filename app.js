const express=require('express');
const app=express();
const path=require('path');
const morgan=require('morgan');
const mongoose=require('mongoose');

//conectar a la BD
mongoose.connect('mongodb://localhost/crud-mongo',  { useNewUrlParser: true }  ).
then(db=>console.log('Conectado a BD'))
.catch(err=>console.log(err));

//importacion de rutas
const indexRoutes=require('./routes/index');

//configuraciones
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//rutas
app.use('/',indexRoutes);

//inciando server
app.listen(app.get('port'), ()=>{
    console.log(`Servidor escuchando en ${app.get('port')}` );
});