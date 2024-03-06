const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    if(req.cookies.customerToken){
        const token = req.cookies.customerToken
        if (!token) {
            return res.json({ status: false , message : 'User Not Authorized'  })
        }
        jwt.verify(token, "token", async (err, data) => {
            if (err) {
                return res.json({ status: false , message : 'User Not Authorized' })
            } else {
                req.user = data.id
                next()
            }
        })
    }
    else if(req.cookies.merchantToken){
        const token = req.cookies.merchantToken;
        if (!token) {
            return res.json({ status: false , message : 'User Not Authorized'  })
        }
        jwt.verify(token, "token", async (err, data) => {
            if (err) {
                return res.json({ status: false , message : 'User Not Authorized' })
            } else {
                req.user = data.id
                next()
            }
        })
    }
   
}
module.exports=verifyToken;