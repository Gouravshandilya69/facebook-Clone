const mongoose = require("mongoose")


const plm = require("passport-local-mongoose")


mongoose.connect("mongodb+srv://gouravshandilya48:<G@urav9605>@facebook.qke8spf.mongodb.net/?retryWrites=true&w=majority")

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
  coverphoto:{
    type:String,
    default:"coverdefault.png"
  }
  ,
  post:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"post"
  }],
  friends:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"friends"
  }]

})

userschema.plugin(plm)
module.exports = mongoose.model('user',userschema);