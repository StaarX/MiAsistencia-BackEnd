const http=require('http')

module.exports.autenticar = function(datos){
    var obj=datos;
    var resultado;
    return prometelo(datos).then(function (result) {
        console.log(result.contraseña);
        if (datos.contraseña==result.contraseña) {
            console.log("VERDADEROOO");
          return true;  
        }else{
            console.log("FALSOOO");
          return false;
        }
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
        reject(JSON.parse({message:'No se encontró al alumno'}));    
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