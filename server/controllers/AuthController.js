const Merchant = require("../models/Merchant.js");
const Customer = require("../models/Customer.js");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.merchantRegister = async (req, res) => {
    try {
        const userNameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
        if (
            !userNameRegex.test(req.body.username)
        ) {
            res.json({
                message: "Invalid Username",
                status: false,
            });
            return;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(req.body.email)) {
            res.json({
                message: "Invalid Email Address",
                status: false,
            });
            return;
        }
        const passwordRegex = /^(?=.*[A-Za-z0-9])(?!.*\s).{8,}$/;
        if (
            !passwordRegex.test(req.body.password)
        ) {
            res.json({
                message:
                    "Password should have minimum 8 characters. No spaces allowed and at least 1 alpahbet or letter is compulsory",
                status: false,
            });
            return;
        }
        const bankNameRegex = /^[A-Za-z\s\-\.,']+$/;
        if (
            !bankNameRegex.test(req.body.bankname)
        ) {
            res.json({
                message:
                    "Invalid name of bank",
                status: false,
            });
            return;
        }
        const nameRegex = /^[A-Za-z\s\-\.,']+$/;
        if (
            !nameRegex.test(req.body.name)
        ) {
            res.json({
                message:
                    "Invalid name",
                status: false,
            });
            return;
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);
       
            const usernameExist = await Merchant.findOne({ username: req.body.username });
            const emailExist = await Merchant.findOne({ email: req.body.email });

            const accountnumberExist = await Merchant.findOne({ accountnumber: req.body.accountnumber });

            if (usernameExist || emailExist || accountnumberExist) {
                res.json({ status: false, message: "Entered credentials are already used" })
                return;
            }

            await Merchant.create({
                username: req.body.username,
                email: req.body.email,
                name: req.body.name,
                bankname: req.body.bankname,
                accountnumber: req.body.accountnumber,
                password: hashPassword
            })
            res.json({ status: true, message: "user registered" })
    } catch (error) {
        res.json({ status: false, message: error.message })

    }
}

exports.customerRegister = async (req, res) => {
    try {
        const userNameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
        if (
            !userNameRegex.test(req.body.username)
        ) {
            res.json({
                message: "Invalid Username",
                status: false,
            });
            return;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(req.body.email)) {
            res.json({
                message: "Invalid Email Address",
                status: false,
            });
            return;
        }
        const passwordRegex = /^(?=.*[A-Za-z0-9])(?!.*\s).{8,}$/;
        if (
            !passwordRegex.test(req.body.password)
        ) {
            res.json({
                message:
                    "Password should have minimum 8 characters. No spaces allowed and at least 1 alpahbet or letter is compulsory",
                status: false,
            });
            return;
        }
        const bankNameRegex = /^[A-Za-z\s\-\.,']+$/;
        if (
            !bankNameRegex.test(req.body.bankname)
        ) {
            res.json({
                message:
                    "invalid bank name",
                status: false,
            });
            return;
        }
        const nameRegex = /^[A-Za-z\s\-\.,']+$/;
        if (
            !nameRegex.test(req.body.name)
        ) {
            res.json({
                message:
                    "Invalid name",
                status: false,
            });
            return;
        }
        const phoneNumberRegex = /^03\d{9}$/;
        if (
            !phoneNumberRegex.test(req.body.phonenumber)
        ) {
            res.json({
                message:
                    "phone number should have 11 digits starting with 03.",
                status: false,
            });
            return;
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);
       
            const usernameExist = await Customer.findOne({ username: req.body.username });
            const emailExist = await Customer.findOne({ email: req.body.email });
            const accountnumberExist = await Customer.findOne({ accountnumber: req.body.accountnumber });
            const phonenumberExist = await Customer.findOne({ phonenumber: req.body.phonenumber });
            if (usernameExist || emailExist || accountnumberExist || phonenumberExist) {
                res.json({ status: false, message: "Entered credentials are already used" })
                return;
            }

            await Customer.create({
                username: req.body.username,
                email: req.body.email,
                name: req.body.name,
                bankname: req.body.bankname,
                accountnumber: req.body.accountnumber,
                password: hashPassword,
                phonenumber: req.body.phonenumber
            })
            res.json({ status: true, message: "user registered" })
    } catch (error) {
        res.json({ status: false, message: error.message })

    }
}