const jwt = require("jsonwebtoken");

verifyCustomerToken = (req, res, next) => {
    console.log(req.cookies.customerToken)
    const token = req.cookies.customerToken
    if (!token) {
        return res.json({ status: false, message: 'User Not Authorized' })
    }
    jwt.verify(token, "token", async (err, data) => {
        if (err) {
            return res.json({ status: false, message: 'User Not Authorized' })
        } else {
            req.user = data.id
            next()
        }
    })
}

verifyMerchantToken = (req, res, next) => {
    const token = req.cookies.merchantToken;
    if (!token) {
        return res.json({ status: false, message: 'User Not Authorized' })
    }
    jwt.verify(token, "token", async (err, data) => {
        if (err) {
            return res.json({ status: false, message: 'User Not Authorized' })
        } else {
            req.user = data.id
            next()
        }
    })
}

module.exports = {
    verifyCustomerToken,
    verifyMerchantToken
};