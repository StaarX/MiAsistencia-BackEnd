const Maestro = require("../modelo/Alumno");
const token= require("../token")

module.exports.obtenerHorario=async function(req,res){
    var validacion=await token.validateToken(req.token);
    if (validacion.error=='undefined') {
        if (validacion.authData.id.substring(0,1)!=='A') {
            res.status(403).json({message:'No tienes permiso para acceder a esta pagina'})   
        }else{
            try{
                res.status(200).json(await Maestro.obtenerHorario(validacion.authData.id));
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