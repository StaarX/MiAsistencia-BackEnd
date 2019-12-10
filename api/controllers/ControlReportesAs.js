const Ra= require("../modelo/ReportesAsistencia");
const token= require("../token");

module.exports.obtenerReporte=async function(req,res){
    var validacion=await token.validateToken(req.token);
    
    if (validacion.error=='undefined') {
        try {
            var resp= await Ra.obtenerReporte(validacion.authData.id);
            console.log(resp);
            res.status(200).json(resp);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }else{
    res.status(404).json(validacion);
    }
}