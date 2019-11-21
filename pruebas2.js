const http=require('http');
var data=JSON.stringify({msg:"A1,A2,A4,A5"});
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
        console.log(chunk);
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
posteameloAlumnos(data).then(resultado=>{
    console.log(resultado);
})