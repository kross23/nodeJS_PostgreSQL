

class PostController{
    async createPost (req, res){
        const{title, content, id} = req.body;
        const post = await bd.query(`INSERT INTO post ( title, content, id) values ($1,$2,$3) RETURNING *`, [ title, content, id])

        res.json(post.rows[0])
    }
    async getPostAll (req, res){
        const   post = await bd.query(`SELECT * FROM post`);
        res.json(post.rows)
    }
    async getPostByUser (req, res){
        const id = req.params.id;
        const  findPost = await bd.query(`SELECT * FROM post where user_id = $1`,[id]);

        res.json(post.rows[0])
    }
}

module.exports = new PostController();