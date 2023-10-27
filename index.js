const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const cors =require('cors')
require("dotenv").config();
const { productRouter } = require('./routes/Product');
const { reviewRouter } = require('./routes/Review');
const { connection } = require('./config/db');


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api",productRouter)
app.use("/api",reviewRouter)

app.listen(process.env.PORT,async () => {
    try{
      await connection
      console.log(`Server is running on port ${process.env.PORT}`);
     
    }catch(err){
      console.log('Error while connecting to DB')
    }
  });
  
  
  