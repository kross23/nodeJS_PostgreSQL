const jwtok = require('jsonwebtoken');
module.exports = function(role){
    if(req.method === "OPTIONS"){
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];//Bearar
    
         if(!token){
           return res.status("401").json({message:"пользователь не авторизован"})
         }
             const decoded = jwtok.verify(token, process.env.SECRET_KEY);
             if(decoded.role !== role){
                return res.status("401").json({message:"пользователь нет доступа"})
             }
         req.user = decoded;
            next();
        
    
    } catch (error) {
    
        res.status("401").json({message:"пользователь не авторизован"})
        
    }
}