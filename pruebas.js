const http=require('http')
function prometemelo(){
    var obj={id:'A14',
       pass: '123tamarindo'}
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

async function hola(){
  var datos;
  await prometemelo().then(function (result){
      datos=result;
  }).catch(function(err){
      
  });
  
}
console.log(hola());

