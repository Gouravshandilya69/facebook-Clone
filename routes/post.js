const mongoose = require("mongoose")






var postschema = mongoose.Schema({
userpost:String,
postdetails :String,
postPic:{
  type:String,
  default:"null"
},
like:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:"users"
}] 


})


module.exports = mongoose.model('post',postschema);