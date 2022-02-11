const jwtok = require('jsonwebtoken');
module.exports = function(req, res, next){
    if(req.method === "OPTIONS"){
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];//Bearar
    
         if(!token){
           return res.status("401").json({message:"пользователь не токен авторизован"})
         }
             const decoded = jwtok.verify(token, process.env.SECRET_KEY);
         req.user = decoded;
            next();
        
    
    } catch (error) {
    
        res.status("401").json({message:"пользователь не польз авторизован"})
        
    }
}