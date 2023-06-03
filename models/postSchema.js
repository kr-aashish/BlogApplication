const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
        title : {type : String, required : true}, 
        description : {type : String, required : true},
        adminId : {type : String, unique: true, required : true},
    },
    {timestamps : true}
);

const postModel = mongoose.model("post", postSchema);

module.exports = {postModel}