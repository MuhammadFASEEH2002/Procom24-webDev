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
exports.getAllCustomers = async (req, res) => {
    try {
        const customer = await Customer.find()
        res.json({ message: "customer found", status: true, customer });
        console.log(customer)
    } catch {
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
        const amountRegex = /^[0-9]+$/;
        if (
            !amountRegex.test(req.body.amount)
        ) {
            res.json({
                message: "Only numbers are allowed in amount",
                status: false,
            });
            return;
        }
        if (req.body.customerAccountNumber || req.body.merchantAccountNumber || req.body.amount || req.body.customerId || req.body.purpose) {
            await Transaction.create({
                customer_account_number: req.body.customerAccountNumber,
                merchant_account_number: req.body.merchantAccountNumber,
                status: "pending",
                amount: req.body.amount,
                merchant_id: req.user,
                customer_id: req.body.customerId,
                purpose: req.body.purpose,
                isActive: true
            })
            res.json({ message: " Payment request created", status: true });

        } else {
            res.json({ message: "empty fields", status: false });

        }

    } catch (error) {
        res.json({ message: error.message, status: false });
    }
}
exports.editRequest = async (req, res) => {
    try {
        const amountRegex = /^[0-9]+$/;
        if (
            !amountRegex.test(req.body.amount)
        ) {
            res.json({
                message: "Only numbers are allowed in amount",
                status: false,
            });
            return;
        }
        if (req.body.amount) {
            await Transaction.findByIdAndUpdate({ _id: req.body.transaction_id }, { amount: req.body.amount })
            res.json({ message: " Payment request updated", status: true });
        }
    } catch (error) {
        res.json({ message: "error", status: false });
    }
}

exports.deleteRequest = async (req, res) => {
    try {
        await Transaction.findByIdAndUpdate({ _id: req.body.transaction_id }, { isActive: false })
        res.json({ message: " Payment request deleted", status: true });
    }
    catch (error) {
        res.json({ message: "error", status: false });

    }
}

exports.getMyRequests = async (req, res) => {
    try {
        const myTransactions = await Transaction.find({ merchant_id: req.user }).populate(
            "customer_id"
        );
        const modifiedTransactions = myTransactions.map(transaction => {
            const { name, bankname } = transaction.customer_id.toObject();
            return {
                name,
                bankname,
                ...transaction.toObject()
            };
        });
        res.json({ message: " Transactions fetched", status: true, myTransactions: modifiedTransactions });
    }
    catch (error) {
        res.json({ message: error.message, status: false });

    }
}


var writeCSV = require('write-csv')
exports.exportPayments = async (req, res) => {
    try {
        const myTransactions = await Transaction.find({ merchant_id: req.user }).populate(
            "customer_id"
        );
        const modifiedTransactions = myTransactions.map(transaction => {
            const { name, bankname } = transaction.customer_id.toObject();
            delete transaction.customer_id;
            return {
                name,
                bankname,
                ...transaction.toObject()
            };
        });
        writeCSV('./public/payments.csv', modifiedTransactions)
          res.json({  status: true });
    }
    catch (error) {
        res.json({ message: error.message, status: false });

    }
}

exports.getStats=async (req,res)=>{
    const allTransactions = await Transaction.find({ merchant_id: req.user })
    // const allTransactions = await Transaction.find({ merchant_id: req.user })
    let totalAmount=0
    let payedAmount=0
    let rejectAmount=0
    let pendingAmount=0

    await allTransactions.map(transaction=>{totalAmount=parseInt(transaction.amount)+totalAmount})
    await allTransactions.map(transaction=>{
        if(transaction.status=="approved"){
            payedAmount=parseInt(transaction.amount)+payedAmount
        }
        else if(transaction.status=="rejected"){
            rejectAmount=parseInt(transaction.amount)+rejectAmount
        }
        else if(transaction.status=="pending"){
            pendingAmount=parseInt(transaction.amount)+pendingAmount
        }
        }
        
        )


    res.json({  status: true , totalAmount, payedAmount, rejectAmount, pendingAmount});


}