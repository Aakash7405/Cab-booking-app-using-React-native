const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
});

const userModel= mongoose.model('details',userSchema);
module.exports=userModel;

