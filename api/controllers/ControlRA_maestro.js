const Ram= require("../modelo/RegistrarAsistencia_maestro");
const token= require("../token");

module.exports.comprobarClaseIniciada= async function(req,res){
var validacion=await token.validateToken(req.token);
    if (validacion.error=='undefined') {
        try {
            var resp= await Ram.comprobarClaseIniciada(validacion.authData.id);   
            if (resp.status=='200') {
                res.status(200).json({estado:resp.datos.estado,
                                      asistentes:resp.datos.asistentes,
                                      clase:resp.clasex,
                                      alumnos:resp.alumnxos});
            }else{
                res.status(403).json({message:'No tiene ninguna clase iniciada'});
            }
        } catch (error) {
        res.status(500).json(error.message);  
        }
        
}else{
    res.status(404).json(validacion);
    }
}



module.exports.obtenerClases=async function(req,res){
    var validacion=await token.validateToken(req.token);
    if (validacion.error=='undefined') {
        if (validacion.authData.id.substring(0,2)!=='MA') {
            res.status(403).json({message:'No tienes permiso para acceder a esta pagina'})   
        }else{
            try{
                res.status(200).json(await Ram.obtenerClasesxMaestro(validacion));
            } catch (error) {
                console.log(error);
                if (error.status=='404') {
                res.status(404).json({message:error.message});
                }else{
                    res.status(500).json({message:'Error al intentar obtener Clases'});}
            }       
        }
    }else{
    res.status(404).json(validacion);
    }
    }
module.exports.iniciarClase=async function(req,res){
var datos=req.body;
var validacion=await token.validateToken(req.token);
if (validacion.error=='undefined') {
    if (validacion.authData.id.substring(0,2)!=='MA') {
        res.status(403).json({message:'No tienes permiso para acceder a esta funcion'})   
    }else{
        try{
            var rxs=await Ram.iniciarClase(datos,validacion);
            if (rxs.res=='true') {
                res.status(200).json({listalumnos:rxs.alumnos,
                                      codigo:rxs.codigo});
            }else{
                res.status(500).json({message:'Hubo un error al intentar iniciar la clase'})
            }
        } catch  (error) {
            console.log(error);
            if (error.status=='404') {
            res.status(404).json({message:error.message});
            if (error.status=='403') {
                res.status(403).json(error.message);    
                }
            }else{
                res.status(500).json({message:error.message});}
        } 
    }
}else{
res.status(403).json(validacion);
}

}
