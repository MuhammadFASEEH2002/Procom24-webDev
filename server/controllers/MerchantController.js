const Merchant = require("../models/Merchant.js");
const Customer = require("../models/Customer.js");
const Transaction = require("../models/Transaction.js");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.getMe = async (req, res) => {
    try {
        const me = await Merchant.findOne({ _id: req.user })
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

exports.getCustomerData = async (req, res) => {
    try {
        const customerData = await Customer.findOne({ username: req.body.customerUsername })
        const merchantData = await Merchant.findOne({ _id: req.user })
        if (customerData && merchantData) {
            res.json({ message: "User found", status: true, customerData, merchantData });
        }
        else {
            res.json({ message: "User not found", status: false });
        }
    } catch (error) {
        res.json({ message: "error", status: false });
    }
}
exports.paymentRequest = async (req, res) => {
    try {
        if (req.body.customerAccountNumber || req.body.merchantAccountNumber || req.body.amount || req.body.customerId) {
            await Transaction.create({
                customer_account_number: req.body.customerAccountNumber,
                merchant_account_number: req.body.merchantAccountNumber,
                status: "pending",
                amount: req.body.amount,
                merchant_id: req.user,
                customer_id: req.body.customerId
            })
            res.json({ message: "Request created", status: true });

        } else {
            res.json({ message: "empty fields", status: false });

        }

    } catch (error) {
        res.json({ message: "error", status: false });
    }
}