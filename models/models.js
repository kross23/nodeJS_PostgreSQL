const sequelize = require('../db');
const {DataTypes} = require('sequelize');


const User = sequelize.define('user', {
id:{type: DataTypes.INTEGER, primaryKey: true ,autoIncrement:true},
email :{type: DataTypes.STRING, unique:true},
password: {type:DataTypes.STRING, unique:false, allowNull:true},
role:{type:DataTypes.STRING, defaultValue: "USER"},
});

const Post = sequelize.define('post', {
    id:{type: DataTypes.INTEGER, primaryKey: true ,autoIncrement:true},
    title:{type:DataTypes.STRING, allowNull: false},
    descr:{type: DataTypes.STRING, allowNull:false},
    doing:{type: DataTypes.BOOLEAN, defaultValue:false},
    image:{type: DataTypes.STRING, allowNull:true}
})


User.hasMany(Post);
Post.belongsTo(User);

module.exports = {
    User,
    Post
}