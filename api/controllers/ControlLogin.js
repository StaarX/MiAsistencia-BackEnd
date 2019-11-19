const Autenticacion = require("../modelo/Autenticacion");
const token= require("../token")
module.exports.login= async function(req,res){
const datos=req.body;
console.log("GIGA PENEEEEEEEEEEEEE" + datos.id);
try {
var condicion=await Autenticacion.autenticar(datos);
    if (condicion.res=='true') {
        var tokensito;
        if (datos.id.substring(0,2)=='MA') {
            tokensito=token.generateToken(datos.id,condicion.nombre,"maestro");
        }
        if (datos.id.substring(0,1)=='A') {
            tokensito=token.generateToken(datos.id,condicion.nombre,"alumno")
        }
        res.status(200).json(tokensito);
    }
    if(condicion.res=='false'){
        res.status(404).json({message:'La contraseña es incorrecta'});
    }
} catch (error) {
    console.log(error);
    if (error.status=='404') {
    res.status(404).json({message:error.message});
    }else{
        res.status(500).json({message:'Error al intentar hacer login'});}
} 
}