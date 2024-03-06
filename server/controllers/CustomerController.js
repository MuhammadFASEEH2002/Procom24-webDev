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
