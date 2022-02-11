const {User} = require('../models/models');
const apiError = require('../error/apiError');
const bcript = require('bcrypt');
const Jwt = require('jsonwebtoken');


const generateJwt = (user_id, email, role) => {
    return jwt = Jwt.sign(
        {id: user_id, email, role},
        process.env.SECRET_KEY,
        {expiresIn:'23h'});
}

class UserController {
    async registration (req, res, next){
        const{email, password, role} = req.body;

        if(!email || !password){
            return next(apiError.badRequest('не коректный email или пароль'));
        }
        
        const checkEmail = await User.findOne({
            where:{email:email}
        })
        if(checkEmail){
            res.json( "пользователь с таким email уже существует");
        }else{
            const hashPassword = await bcript.hash( String(password), 7);

            console.log(role);
            const user = await User.create({email, password:hashPassword, role});

                const jwt = generateJwt(user.id, email, user.role);
            res.json({jwt});
        }
    }
 
    async login (req, res, next){
        console.log("res.header: ", req);
        const {email, password} = req.body;
        const user = await User.findOne({ where: {email}});
        if(user){
            let comparePassword = bcript.compareSync(String(password), user.password);
            if( comparePassword ){
                const jwt = generateJwt(user.id, email, user.role);
                // res.header('Access-Control-Allow-Origin', '*')
                
                // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
                // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                return res.json({jwt});
            }else{
                next(apiError.badRequest('не верный емаил или пароль'));
            }
        }else{
            next(apiError.badRequest('не верный емаил или пароль'));
        }
      
    }

    async check (req, res, next){
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({token});
    
    }

}

module.exports = new UserController();