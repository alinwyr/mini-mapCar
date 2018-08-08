const express = require('express')
const path = require("path")
const fs = require("fs")
const User = require('./api/user/user.js')

const app = express();
const port = 4000


var files = [],dirs = [];

app.get('/api/*', (req, res,next) => {
    let pathfile = req.path;
    try{
        let json = require(path.join(__dirname,pathfile + '.js'));
        if(json){
            res.send({
                errcode:0,
                data:json
            })
        }
    }catch(e){
        res.send({
            errcode:1000,
            data:"",
            errmsg:"目录与文件夹路径名"
        })
    }
   
})

app.listen(port, () => {
  console.log(`Server Starts at ${port}`)
})