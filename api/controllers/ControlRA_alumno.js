const Raa= require("../modelo/RegistrarAsistencia_alumno");
const token= require("../token");
module.exports.comprobarClaseIniciada=async function(req,res){
    var validacion=await token.validateToken(req.token);
    if (validacion.error=='undefined') {
        try {
            var resp= await Raa.comprobarClaseIniciada(validacion.authData.id);  
            console.log(resp); 
            if (resp==undefined) {
            res.status(404).json({message:'No hay ninguna clase iniciada'});    
            }else
            {
                if (resp.status=='200') {
                res.status(200).json({res:'OK',
                                      estado:resp.datos.estado,
                                      clase:resp.datos});
            }else{
                res.status(403).json({message:'No tiene ninguna clase iniciada'});
            }}    
        } catch (error) {
            console.log(error);
        res.status(500).json(error.message);  
        }
        
}else{
    res.status(404).json(validacion);
    }
}
module.exports.registrarAsistencia=async function(req,res){
    var validacion=await token.validateToken(req.token);
    var body=req.body;
    console.log(validacion.authData.id);
    if (validacion.error=='undefined') {
    try {
        var resp= await Raa.registrarAsistencia(validacion.authData.id,body.clase,body.maestro,body.codigo);
        if (resp.res=='true') {
            res.status(200).json({message:'OK'}); 
        }else{
            res.status(403).json({message: resp.message});
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
    }else{
    res.status(404).json(validacion);
    }  
}