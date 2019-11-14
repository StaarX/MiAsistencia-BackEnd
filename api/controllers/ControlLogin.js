const Autenticacion = require("../modelo/Autenticacion");
const token= require("../token")
module.exports.login= async function(req,res){
const datos=req.body;
console.log("GIGA PENEEEEEEEEEEEEE" + datos.id);
try {
    if (await Autenticacion.autenticar(datos)) {
        var tokensito=token.generateToken(datos.id);
        res.status(200).json(tokensito);
    }else{
        res.status(404).json({message:'El ID es inválido o la contraseña es incorrecta'});
    }
} catch (error) {
    console.log(error);
    res.status(500).json("Error al intentar hacer login");
} 
}