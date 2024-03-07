const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    customer_account_number: { type: String, required: true },
    merchant_acoount_number: { type: String, required: true },
    status: { type: String, required: true },
    amount: { type: String, required: true },
    merchant_id: { type: String, required: true },
    customer_id: { type: String, required: true },
    purpose: { type: String, required: true }
},
    {
        timestamps: true
    }
);
const Transaction = mongoose.model("transaction", TransactionSchema);
module.exports = Transaction;