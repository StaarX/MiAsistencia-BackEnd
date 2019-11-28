const http=require('http')
const Asistencia= require('./schemas/Asistencia')

module.exports.obtenerReporte=async function(idMa){
    var result=[];
    var findeados=await Asistencia.find({idmaestro:idMa,estado:'Finalizada'},function(err,obj){
    });  
if (findeados.length>9) {
    for (let index = findeados.length-10; index < findeados.length; index++) {
        result.push(findeados[index]);
        
    }
}else{
    findeados.forEach(element => {
        result.push(element);
    });
}

    return result;  
}

