const http=require('http')
const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

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
module.exports.iniciarClase= async function(datos){
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
        }
       } 
    });
    if (eshoy) {
        
    }else{
     return {status:"403",
             message:"Hoy no es el día"}    
    }
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