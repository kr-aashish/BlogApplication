const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email : {type : String, unique : true, required : true},
  age : {type : Number, required: true}
},
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema)


module.exports = { UserModel }