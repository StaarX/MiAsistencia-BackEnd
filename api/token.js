const jwt = require("jsonwebtoken");
const secretPhrase = "4s1st3a3st4";

exports.generateToken = function(user,name,type){
    return jwt.sign({id:user,nombre:name,tipo:type}, secretPhrase,{expiresIn: "60m"});
}

//MANEJO CON ASYNC/AWAIT
exports.validateToken = async function(token) {
    var respuesta = await jwt.verify(token,secretPhrase, function(err,authData){
    if(err){
        return {error: 'Token inválido',
                message:err}
    }else{
        return {error: 'undefined',
                message: 'Bien hecho amiguito tu token es valido',
                authData}
    }
    });
    return respuesta; 
    }
exports.checkToken = (req, res, next) => {
    const header = req.headers.authorization;
    if(typeof header !== 'undefined') {
        req.token = header;
        next();
    } else {
        
        res.status(403).json({message:"No hay un token en el Header"});
    }
}