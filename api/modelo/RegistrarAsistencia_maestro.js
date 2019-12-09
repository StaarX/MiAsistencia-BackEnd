const http=require('http')
const weekday = new Array(7);
const Asistencia= require('./schemas/Asistencia')
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

module.exports.registrarAsistencia=async function(idA,idMa){
    var findeado=await Asistencia.findOne({idmaestro:idMa,estado:'Iniciada'},function(err,obj){
    });
    console.log("ENCONTRADOOO: "+findeado);
    if (findeado!=null) { 
    for (let index = 0; index < findeado.asistentes.length; index++) {
        if (findeado.asistentes[index]==idA) {
            return {status:'403',
                    message:'Este alumno ya registró su asistencia.'}
        }     
    }
    findeado.asistentes.push(idA);
    await findeado.save();
    return {status:'200',
    message:'OK'} ;
    }else{
        return {status:'403',
        message:'No hay clase iniciada.'}  
    }
}
module.exports.eliminarAsistencia=async function(idA,idMa){
    var findeado=await Asistencia.findOne({idmaestro:idMa,estado:'Iniciada'},function(err,obj){
    });
    console.log("ENCONTRADOOO: "+findeado);
    findeado.asistentes.remove(idA);
    var result= await findeado.save();
    return result;
}
module.exports.finalizarClase=async function(idMa){
    var findeado=await Asistencia.findOne({idmaestro:idMa,estado:'Iniciada'},function(err,obj){
    });
    console.log("ENCONTRADOOO: "+findeado);
    findeado.estado='Finalizada';
    var result= await findeado.save();
    return result;
}


module.exports.comprobarClaseIniciada=async function(id){
    var findeado=await Asistencia.findOne({idmaestro:id,estado:'Iniciada'}, function(err, obj){
    });
    console.log(findeado);
    if (findeado!=null) {
    var clasx= await prometeloClase({id:findeado.id}).then(result=>{
        return result
    });
    var alumnxs= await posteameloAlumnos(JSON.stringify({msg:clasx.alumnosins.toString()})).then(result=>{
        return result;
    });
        return {status:'200',
                datos:findeado,
                clasex:clasx,
                alumnxos:alumnxs};
    }else{
        return {status:'403',
                msg:'No hay clase iniciada'};
    }
}

module.exports.obtenerClasesxMaestro=function(datos){
    return prometelo(datos).then(function (result) {
        return result;
    });
}

function prometelo(datos){
    var options={
        hostname: 'localhost',
        port: '3001',
        path: '/obtenerClasesXMaestro/'+datos.authData.id,
        method: 'GET'
    }
    return new Promise(function(resolve, reject){ 
    var req=http.request(options,function(res){
    if (res.statusCode==404) {
        reject(JSON.parse(JSON.stringify({
            status:'404',
            message:'No se encontró al maestro'})));    
    }
    var body=[];
    res.on('data',function(chunk){
        body.push(chunk);
    });
    res.on('end',function(chunk){
        try {
            body=JSON.parse(body);
        } catch (err) {
            reject(err);
        }
        resolve(body);
    });
    });
    req.on('error',function(err){
        reject(err);
    });
    req.end();
    });    
}

module.exports.iniciarClase= async function(datos,token){
    var date= new Date();
    var eshoy=false;
    var respuesta= await prometeloClase(datos).then(function (result) {
        return result;
    });
    var dia=traducir(respuesta.dias);

    dia.forEach(element => {
       if (element==weekday[date.getDay()]) {
        var horai=Date.parse('01/01/2011 '+respuesta.horarioinicio);
        var hoy=Date.parse('01/01/2011 '+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
        var horaf=Date.parse('01/01/2011 '+respuesta.horariofin);
        if (hoy>horai&&hoy<horaf) {
            eshoy=true;
            console.log("ES HOY");
        }
       } 
    });
    if (eshoy) {
    var alumnxs= await posteameloAlumnos(JSON.stringify({msg:respuesta.alumnosins.toString()})).then(result=>{
        return result;
    });
    var codiguin=generarCodigo();
    var resx= await metemelaClase(respuesta,token,codiguin);
    if (resx.res=='true') {
        return {res:'true',
                alumnos:alumnxs,
                codigo:codiguin};
    }else{
        return resx;
    }
    }else{
     throw new Error("No puede iniciar esta clase por que aún no es hora.");   
    }
}
async function metemelaClase(clase,token,code){
var clase= new Asistencia({id:clase.id,
                           codigo:code,
                           idmaestro:token.authData.id,
                           nombre:clase.nombre
                           });
console.log("MONGOOSE: "+clase);
    try {
       await clase.save();    
        return {res:'true'};
    } catch (err) {
        return {res:'false',
                error:err};
    }
}
function generarCodigo(){
    var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < 5; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
function posteameloAlumnos(datos){
    var options={
        hostname: 'localhost',
        port: '3001',
        path: '/obtenerAlumnosXClase/',
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'Content-Length':datos.length
        }
    }
    return new Promise(function(resolve, reject){ 
    var req=http.request(options,function(res){
    if (res.statusCode==404) {
        reject(JSON.parse(JSON.stringify({
            status:'404',
            message:'No se encontraron los alumnos'})));    
    }
    var body=[];
    res.on('data',function(chunk){
        body.push(chunk);
    });
    res.on('end',function(chunk){
        try {
            body=JSON.parse(body);
        } catch (err) {
            reject(err);
        }
        resolve(body);
    });
    });
    req.on('error',function(err){
        reject(err);
    });   
req.write(datos);
req.end();
    });    
}
function traducir(parametro) {
    var dia=[];
    dia=parametro.split(",");
    for (let index = 0; index < dia.length; index++) {
        
        switch (dia[index]) {
            case "Domingo":
              dia[index] = "Sunday";
              break;
            case "Lunes":
              dia[index] = "Monday";
              break;
            case "Martes":
              dia[index] = "Tuesday";
              break;
            case "Miercoles":
              dia[index] = "Wednesday";
              break;
            case "Jueves":
              dia[index] = "Thursday";
              break;
            case "Viernes":
              dia[index] = "Friday";
              break;
            case  "Sabado":
              dia[index] = "Saturday";}  
    }
    return dia;  
}

function prometeloClase(datos){
    var options={
        hostname: 'localhost',
        port: '3001',
        path: '/obtenerClase/'+datos.id,
        method: 'GET'
    }
    return new Promise(function(resolve, reject){ 
    var req=http.request(options,function(res){
    if (res.statusCode==404) {
        reject(JSON.parse(JSON.stringify({
            status:'404',
            message:'No se encontró la clase'})));    
    }
    var body=[];
    res.on('data',function(chunk){
        body.push(chunk);
    });
    res.on('end',function(chunk){
        try {
            body=JSON.parse(body);
        } catch (err) {
            reject(err);
        }
        resolve(body);
    });
    });
    req.on('error',function(err){
        reject(err);
    });
    req.end();
    });    
}