const {Post}= require('../models/models');
const ApiError = require('../error/apiError');
class PostController{
    async createPost (req, res){
        const  {email, id, role} = req.user;
        
      //  res.json(req.user);
        const{title, descr,  going, image } = req.body;

        const post = await Post.create({userId:id, title, descr, going, image});
        res.json(post);
    }

    async getPostAll (req, res){
        const  {email, id, role} = req.user;
        
       // res.json(userId)
         const   posts = await Post.findAll({where: {userId: id } })
         if(!posts){
            res.json("посты не найдены")
         }else{
            res.json(posts)
         }
    }


    async delitePost (req, res){
        const  {email, id, role} = req.user;
        const {postId} = req.body;
        const postdel = Post.findOne({ where:{id:postId, userId:id} });
        if(postdel){
            await Post.destroy( { where:{id:postId, userId:id} } );
            res.json('delete postID');
        }else{
            res.json('пост не найден');
        }
      
    }
    async putPost (req, res){
        const {id} = req.user;
        const {postId, bool, descr} = req.body;
    if(descr){
        const post = await Post.update({ "descr": descr },{where:{id:postId, userId:id} });
        if(!post){
         res.json("не удача");
        }else{
         
         res.json(post.descr);
         
        }
    }else{
        const post = await Post.update({ "doing": !bool },{where:{id:postId, userId:id} });
        if(!post){
         res.json("не удача");
        }else{
         
         res.json(post);
         
        }
    }
       
  
        
    }



    // async deletePost (req, res){
    //     const id = req.params.id; // получение id из параметров запроса http://localhost:4000/api/user/1
    //     const  user = await bd.query(`DELETE  FROM post where id = $1`,[id]);
    // }

}

module.exports = new PostController();