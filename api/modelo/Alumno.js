const http=require('http')

module.exports.obtenerHorario=function(idA){
    return prometeloH(idA).then(function (result) {
        return result;
    }); 
}
function prometeloH(idAa){
    var options={
        hostname: 'localhost',
        port: '3001',
        path: '/obtenerClasesXAlumno/'+idAa,
        method: 'GET'
    }
    return new Promise(function(resolve, reject){ 
    var req=http.request(options,function(res){
    if (res.statusCode==404) {
        reject(JSON.parse(JSON.stringify({
            status:'404',
            message:'No se encontró al Alumno'})));    
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