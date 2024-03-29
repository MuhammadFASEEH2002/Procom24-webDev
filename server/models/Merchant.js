const mongoose = require("mongoose");

const MerchantSchema = new mongoose.Schema({
    name:{type: String, required:true},
    username:{type: String, required:true},
    email:{type: String, required:true},
    bankname:{type: String, required:true},
    accountnumber:{type: String, required:true},
    password:{type: String, required:true}, 
});
const Merchant = mongoose.model("merchant", MerchantSchema);
module.exports = Merchant;