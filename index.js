const express = require('express');
const req = require('express/lib/request');
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routers');

const PORT = process.env.PORT || 4000;


const app = express();

app.use(express.json());

app.use('/api', userRouter);
app.use('/api', postRouter);


app.listen(PORT , ()=> console.log(`start ${PORT}`, app.settings.env));
