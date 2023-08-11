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
    type:mongoose.Schema.Types.ObjectId,
    default:[]
  }
})



module.exports = mongoose.model('friends',friends);