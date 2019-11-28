const http=require('http')

module.exports.obtenerMaestro=function(datos){
    return prometelo(datos).then(function (result) {
        return result;
    });
}

module.exports.obtenerHorario=function(idMa){
    return prometeloH(idMa).then(function (result) {
        return result;
    });    
}

function prometeloH(idMaa){
    var options={
        hostname: 'localhost',
        port: '3001',
        path: '/obtenerClasesXMaestro/'+idMaa,
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
    var options={
        hostname: 'localhost',
        port: '3001',
        path: '/obtenerMaestro/'+datos.authData.id,
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