'use strict';

const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const notFoundHandler = require('./handlers/404');
const errorHandler = require('./handlers/500');
const stamper = require('./middlewares/stamper');


app.get('/', (req,res)=>{
    res.status(200).send('Server is Up & Running!')
});


// Add middleware stamp
app.get('/data', stamper, (req,res)=>{
      res.status(200).json({
        10: "even",
        5: "odd",
        "time": req.timestamp // we got this from the middleware
      });
});

app.get('/bad',(req,res,next)=>{
    throw new Error('You made an Error 🛑❗')
});

app.use('*', notFoundHandler);
app.use(errorHandler);



// Add function start to initiate it from index.js
function start(){
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`);
    })
}

module.exports = {app, start}