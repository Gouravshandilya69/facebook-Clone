const mongoose = require("mongoose")


const plm = require("passport-local-mongoose")


mongoose.connect("mongodb+srv://Facebook:i7ScCPQ3yN7nNZpQ@facebook.yfnoifi.mongodb.net/?retryWrites=true&w=majority")

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