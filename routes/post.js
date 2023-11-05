const mongoose = require("mongoose")


var postschema = mongoose.Schema({
userpost:String,
name:String,
date:String,
postdetails :String,
postPic:{
  type:String,
  default:null
},
fileType:String,
like:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:"users"
}] 


})


module.exports = mongoose.model('post',postschema);