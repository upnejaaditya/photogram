const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
server.use(express.static('build'));

mongoose.connect('mongodb+srv://aditya:aditya@2409@cluster0-0jlaw.mongodb.net/photogram', {useNewUrlParser: true}
).then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!");
    console.log(error);
  });


const photoSchema = new Schema({
    title:  {type:String,required:true},
    cap: {type:String,required:true},
    image: {type:String,required:true},
    uid:{type:String,required:true}
  });

const Photo = mongoose.model('Photo', photoSchema);


server.use(express.static('build'))
server.use(bodyParser.urlencoded())
server.use(bodyParser.json())
server.use(cors());


server.post("/photo",function(req,res){
    
    let photo = new Photo();
    photo.title = req.body.title ;
    photo.cap = req.body.cap ;
    photo.uid = req.body.uid ;
    photo.image = req.body.image ;
    photo.save().then((doc)=>{
        res.json(doc);
    })

})   

server.get("/photos",function(req,res){
    
 Photo.find({uid:req.query.uid}).then((docs)=>{
    res.json(docs);
 })

})   

server.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, './build/')});
  });




server.listen(process.env.PORT || 8080,function(){
    console.log("server started");
})