const Ram= require("../modelo/RegistrarAsistencia_maestro");
const token= require("../token");
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
            res.status(200).json(await Ram.iniciarClase(datos));
        } catch (error) {
            console.log(error);
            if (error.status=='404') {
            res.status(404).json({message:error.message});
            }else{
                res.status(500).json({message:'Error al intentar iniciar Clase'});}
        } 
    }
}else{
res.status(404).json(validacion);
}

}
