const mongoose = require("mongoose")


const plm = require("passport-local-mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/facebook")

var userschema = mongoose.Schema({
  First_Name:String,
  Last_name:String,
  username:String,
  password:String,
  date:Number,
  month:Number,
  year:Number,
  Gender:String,
  profile:{
    type:String,
    default:"default.png"
  }
  ,
  post:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"post"
  }]

})

userschema.plugin(plm)
module.exports = mongoose.model('user',userschema);