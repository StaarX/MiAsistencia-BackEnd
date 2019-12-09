const Asistencia= require('./schemas/Asistencia')
const http=require('http')
module.exports.comprobarClaseIniciada=async function(idA){
    console.log(idA);
    var clasx= await prometeloClase({id:idA}).then(result=>{
        return result
    });
    console.log("CALSEEE: "+JSON.stringify(clasx));
     for (let index = 0; index < clasx.length; index++) {
        console.log("DEBUUG: "+clasx[index].id+","+clasx[index].maestro);
        var findeado= await Asistencia.findOne({id:clasx[index].id,idmaestro:clasx[index].maestro,estado:'Iniciada'}, function(err, obj){
            return obj;
        });  
     } 
     console.log(findeado);
        if (findeado!=null) {
            return {status:'200',
                    datos:findeado};
        }else{
            return {status:'403',
                    msg:'No hay clase iniciada'};
        } 
    
}
module.exports.registrarAsistencia=async function(idA,idC,idM,codigo){
    var findeado=await Asistencia.findOne({id:idC,idmaestro:idM,estado:'Iniciada'},function(err,obj){
    });
    if (findeado!=null) {
        for (let index = 0; index < findeado.asistentes.length; index++) {
            if (findeado.asistentes[index]==idA) {
                return {status:'403',
                        message:'Este alumno ya registró su asistencia.'}
            }     
        }
        if (findeado.codigo==codigo) {
            findeado.asistentes.push(idA);
            var result= await findeado.save();
            return  {status:'200',
                     resultado:result};   
        }else{
            return  {status:'403',
                     message:'El codigo es incorrecto.'};
        }    
    }else{
            return {status:'403',
                    message:'No hay clase iniciada.'}
    }
    console.log("ENCONTRADOOO: "+findeado);
    
}

function prometeloClase(datos){
    var options={
        hostname: 'localhost',
        port: '3001',
        path: '/obtenerClasesXAlumno/'+datos.id,
        method: 'GET'
    }
    return new Promise(function(resolve, reject){ 
    var req=http.request(options,function(res){
    if (res.statusCode==404) {
        reject(JSON.parse(JSON.stringify({
            status:'404',
            message:'No se encontraron las clases'})));    
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