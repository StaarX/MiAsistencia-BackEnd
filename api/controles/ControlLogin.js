const Autenticacion = require("../modelo/Autenticacion");
module.exports.login= async function(req,res){
const datos=req.body;
try {
    var result = await Autenticacion.autenticar(datos);
} catch (error) {
    res.status(500).json("Error al intentar hacer login");
}    
}