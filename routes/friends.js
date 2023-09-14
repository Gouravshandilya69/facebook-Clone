const mongoose = require("mongoose")


var friends = mongoose.Schema({
  friendreqsent:{
    type:Array,
    default:[]
  },
  friendreqreceived:{
    type:Array,
    default:[]
  },
  friends:{
    type:Array,
    default:[]
  },
  dataof:[{
  
      type:mongoose.Schema.Types.ObjectId,
      ref:"users"

  }]
})



module.exports = mongoose.model('friends',friends);