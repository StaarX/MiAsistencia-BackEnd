const http=require('http')
var data=JSON.stringify({msg:'A1,A2,A4,A13'});
    function prometelo(datos){
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

    prometelo(data).then(result=>{
        console.log(result);
    }).catch(err=>{
        console.log(err)
    })