const express = require('express');
const req = require('express/lib/request');
const PORT = process.env.PORT || 8080;


const app = express();
app.get('/',(req, res)=>{
    res.send('hello postgres ')
})


app.listen(PORT , ()=> console.log('start ', PORT));
