const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    // role : {type: String, required:true},
    // firstName : {type: String, required:true},
    // lastName: {type: String, required:true},
    // email:{type: String, required:true},
    name:{type: String, required:true},
    username:{type: String, required:true},

    email:{type: String, required:true},
    bankname:{type: String, required:true},
    accountnumber:{type: String, required:true},
    password:{type: String, required:true},
    phonenumber:{type: String, required:true},



    
});
const Customer = mongoose.model("merchant", CustomerSchema);
module.exports = Customer;