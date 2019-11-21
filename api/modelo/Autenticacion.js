const http=require('http')

module.exports.autenticar = function(datos){
    if (datos.id.substring(0,2)=='MA') {
        return prometelomaestro(datos).then(function (result) {
            console.log(result.contraseña);
            if (datos.contraseña==result.contraseña) {
                console.log("VERDADEROOO");
              return {res:'true',
                      nombre:result.nombre};  
            }else{
                console.log("FALSOOO");
              return {res:'false'};
            }
        });
    }
    if (datos.id.substring(0,1)=='A') {
        return prometelo(datos).then(function (result) {
            console.log(result.contraseña);
            if (datos.contraseña==result.contraseña) {
                console.log("VERDADEROOO");
                return {res:'true',
                nombre:result.nombre};    
            }else{
                console.log("FALSOOO");
                return {res:'false'};
            }
        });   
    }
    if (datos.id.substring(0,1)!=='A' && datos.id.substring(0,2)!=='MA') {
        return {res:'invalido'}; 
    }
}
function prometelomaestro(datos){
    var obj=datos
    var options={
        hostname: 'localhost',
        port: '3001',
        path: '/obtenerMaestro/'+obj.id,
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
function prometelo(datos){
    var obj=datos
    var options={
        hostname: 'localhost',
        port: '3001',
        path: '/obtenerEstudiante/'+obj.id,
        method: 'GET'
    }
    return new Promise(function(resolve, reject){
    var req=http.request(options,function(res){
    if (res.statusCode==404) {
        reject(JSON.parse(JSON.stringify({
            status:'404',
            message:'No se encontró al alumno'})));    
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