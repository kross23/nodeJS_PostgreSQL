const bd = require('../db')


class UserController {

    async createUser (req, res){
        const{nameperson, surname, age} = req.body;
        const personName = await bd.query(`INSERT INTO person ( nameperson,surname, age) values ($1,$2,$3) RETURNING *`, [ nameperson, surname, age])

        res.json(personName.rows[0])
    }
    async getUsers (req, res){
        const   users = await bd.query(`SELECT * FROM person`);
        res.json(users.rows)
    }

    async getOneUsers (req, res){
        const id = req.params.id; // получение id из параметров запроса http://localhost:4000/api/user/1
        const  findUser = await bd.query(`SELECT * FROM person where id = $1`,[id]);
        if(findUser.rows[0]){
            res.json(findUser.rows[0])
        }else{
            res.json("пользователь не найден")
        }  
    }
    async updateUser (req, res){
        const{id, age} = req.body;
        const personName = await bd.query(`UPDATE person SET age = $1 WHERE id = $2  RETURNING *`,
        [ age, id]);
        res.json(personName.rows[0]);
    }

    async deleteUsers (req, res){
        const id = req.params.id; // получение id из параметров запроса http://localhost:4000/api/user/1
        const  user = await bd.query(`DELETE  FROM person where id = $1`,[id]);
       
        
    }
}

module.exports = new UserController();