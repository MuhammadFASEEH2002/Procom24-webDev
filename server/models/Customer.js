const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name:{type: String, required:true},
    username:{type: String, required:true},
    email:{type: String, required:true},
    bankname:{type: String, required:true},
    accountnumber:{type: String, required:true},
    password:{type: String, required:true},
    phonenumber:{type: String, required:true},  
});
const Customer = mongoose.model("customer", CustomerSchema);
module.exports = Customer;