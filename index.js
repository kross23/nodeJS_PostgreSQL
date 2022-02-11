const express = require('express');
const  cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./db');
const models = require("./models/models");
const router =  require('./routes/index');
const req = require('express/lib/request');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');
require('dotenv').config();



const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', router);


app.use(express.static(path.resolve(__dirname, 'static')));
app.use(errorHandler);

const start  = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT , () => console.log(`start ${PORT}` )); 
    } catch (error) {
        console.log('error', error);
    }
}


start();