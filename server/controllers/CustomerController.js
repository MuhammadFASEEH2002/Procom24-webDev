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
        const myTransactions = await Transaction.find({ customer_id: req.user }).populate(
            "merchant_id"
        );
        const modifiedTransactions = myTransactions.map(transaction => {
            const { name, bankname } = transaction.merchant_id.toObject();
            return {
                name,
                bankname,
                ...transaction.toObject()
            };
        });
        res.json({ message: " Transactions fetched", status: true, myTransactions: modifiedTransactions });
    } catch (error) {
        res.json({ message: "error", status: false });
    }
}
exports.fetchTransaction = async (req, res) => {
    try {
        // transaction id should be given with the onClick func on pay button
        const transaction = await Transaction.findOne({ _id: req.body.transaction_id })

        res.json({ message: " Transaction fetched", status: true, transaction });
    } catch (error) {
        res.json({ message: "error", status: false });
    }
}

exports.payTransaction = async (req, res) => {
    try {
        // transaction id should be given with the onClick func on pay button
        await Transaction.findByIdAndUpdate({ _id: req.body.transaction_id }, { status: "approved" })

        res.json({ message: " Payment Approved", status: true });
    } catch (error) {
        res.json({ message: "error", status: false });
    }
}

exports.rejectTransaction = async (req, res) => {
    try {
        // transaction id should be given with the onClick func on pay button
        await Transaction.findByIdAndUpdate({ _id: req.body.transaction_id }, { status: "rejected" })

        res.json({ message: " Payment Rejected", status: true });
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
}

exports.getStats = async (req, res) => {
    try {
        const totalTransactions = await Transaction.countDocuments({ customer_id: req.user })
        const successTransaction = await Transaction.countDocuments({ customer_id: req.user, status: "approved" })
        const rejectTransaction = await Transaction.countDocuments({ customer_id: req.user, status: "rejected" })


        res.json({ status: true, totalTransactions ,successTransaction, rejectTransaction});
    } catch (error) {
        res.json({ message: error.message, status: false });

    }
    // const allTransactions = await Transaction.find({ customer_id: req.user })

}
