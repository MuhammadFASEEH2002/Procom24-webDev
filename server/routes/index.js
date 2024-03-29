const router = require('express').Router()
const AuthController = require('../controllers/AuthController.js')
const { verifyCustomerToken, verifyMerchantToken } = require('../middlewares/AuthMiddleware');

const CustomerController = require('../controllers/CustomerController.js')
const MerchantController = require('../controllers/MerchantController.js')


// const authController  = require('../controllers/authController.js')
// const studentController  = require('../controllers/studentController.js')

// auth routes
router.post('/merchant/register', AuthController.merchantRegister)
router.post('/merchant/login', AuthController.merchantLogin)
router.post('/customer/register', AuthController.customerRegister)
router.post('/customer/login', AuthController.customerLogin)


// merchant routes
router.get('/merchant/export/payments', verifyMerchantToken ,MerchantController.exportPayments)
router.get('/merchant/get-me', verifyMerchantToken, MerchantController.getMe)
router.get('/merchant/get-all-customer-data', verifyMerchantToken, MerchantController.getAllCustomers)
router.post('/merchant/get-customer-data', verifyMerchantToken, MerchantController.getCustomerData)
router.post('/merchant/payment-request', verifyMerchantToken, MerchantController.paymentRequest)
router.post('/merchant/edit-payment-request', verifyMerchantToken, MerchantController.editRequest)
router.post('/merchant/delete-payment-request', verifyMerchantToken, MerchantController.deleteRequest)
router.get('/merchant/get-my-payment-requests', verifyMerchantToken, MerchantController.getMyRequests)
router.get('/merchant/get-stats', verifyMerchantToken, MerchantController.getStats)



// customer routes
router.get('/customer/get-me', verifyCustomerToken, CustomerController.getMe)
router.get('/customer/get-all-transaction', verifyCustomerToken, CustomerController.getAllTransactions)
router.post('/customer/pay-transaction', verifyCustomerToken, CustomerController.payTransaction)
router.post('/customer/reject-transaction', verifyCustomerToken, CustomerController.rejectTransaction)
router.post('/customer/reject-transaction', verifyCustomerToken, CustomerController.rejectTransaction)
router.get('/customer/get-stats', verifyCustomerToken, CustomerController.getStats)





module.exports = router;