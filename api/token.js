const jwt = require("jsonwebtoken");
const secretPhrase = "4s1st3a3st4";

exports.generateToken = function(user){
    return jwt.sign({user}, secretPhrase,{expiresIn: "60m"});
}

//MANEJO CON ASYNC/AWAIT
exports.validateToken = async function(token) {
    var respuesta = await jwt.verify(token,secretPhrase, function(err,user){
    if(err){
        return {error: 'Token inválido'}
    }else{
        return {message: 'Bien hecho amiguito tu token es valido'}
    }
    });
    return respuesta; 
    }