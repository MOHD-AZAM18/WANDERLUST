const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema ( {
    email : {
        type : String,
        required : true 
    },
});


//  it automatically implement username, hashing, salting and hashpassword  so we use User.plugin//
userSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model("User", userSchema);