const apiError = require('../error/apiError');


class testController{


    async test(req, res,){
        return res.json('express run');
    }
}


module.exports = new testController();