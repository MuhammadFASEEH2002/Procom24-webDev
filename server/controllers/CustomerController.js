const Merchant = require("../models/Merchant.js");
const Customer = require("../models/Customer.js");
const Transaction = require("../models/Transaction.js");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.getMe = async (req, res) => {
    try {
        const me = await Customer.findOne({ _id: req.user })
        console.log(me)
        if (me) {
            res.json({ message: "User found", status: true, me });
        }
        else {
            res.json({ message: "User not found", status: false });
        }
    } catch (error) {
        res.json({ message: "error", status: false });
    }
}

exports.getAllTransactions = async (req, res) => {
    try {
        const myTransactions = await Transactions.find({ customer_id: req.user }).populate(
            "merchant"
        );
        res.json({ message: " Transactions fetched", status: true , myTransactions});
    } catch (error) {
        res.json({ message: "error", status: false });
    }
}
exports.fetchTransaction = async (req, res) => {
    try {
        // transaction id should be given with the onClick func on pay button
      const transaction=await Transaction.findOne({ _id: req.body.transaction_id })
      
        res.json({ message: " Transaction fetched", status: true , transaction});
    } catch (error) {
        res.json({ message: "error", status: false });
    }
}

exports.payTransaction = async (req, res) => {
    try {
        // transaction id should be given with the onClick func on pay button
        await Transaction.findByIdAndUpdate({ _id: req.body.transaction_id }, { status: "approved" })
      
        res.json({ message: " Payment Approved", status: true});
    } catch (error) {
        res.json({ message: "error", status: false });
    }
}

exports.rejectTransaction = async (req, res) => {
    try {
        // transaction id should be given with the onClick func on pay button
        await Transaction.findByIdAndUpdate({ _id: req.body.transaction_id }, { status: "rejected" })
      
        res.json({ message: " Payment Rejected", status: true});
    } catch (error) {
        res.json({ message: "error", status: false });
    }
}
