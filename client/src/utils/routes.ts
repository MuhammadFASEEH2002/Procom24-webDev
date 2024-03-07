export default class RoutesPath {
    static HOME = '/';
    static MERCHANT_LOGIN = '/merchant/login';
    static MERCHANT_DASHBOARD = '/merchant/dashboard';
    static MERCHANT_CUSTOMERS = '/merchant/customers/view';
    static MERCHANT_PAYMENTS = '/merchant/payments/view';
    static MERCHANT_PAYMENT_REQUEST = '/merchant/payment-request';
    static MERCHANT_LOGOUT = '/merchant/logout';
    static MERCHANT_REPORT = '/merchant/report/view';


    static CUSTOMER_LOGIN = '/customer/login';
    static CUSTOMER_REGISTER = '/customer/register';
    static CUSTOMER_DASHBOARD = '/customer/dashboard';
    static CUSTOMER_LOGOUT = '/customer/logout';
    static CUSTOMER_PAYMENTS = '/customer/payments/view';
    static CUSTOMER_SEND_PAYMENTS = '/customer/payments/send';

    // to be implemented routes
    static MERCHANT_PAYMENT_REQUEST_VIEW = '/merchant/payment-request/view';
    static MERCHANT_PAYMENT_REQUEST_EDIT = '/merchant/payment-request/edit';
    static MERCHANT_PAYMENT_REQUEST_CREATE = '/merchant/payment-request/create';
    static MERCHANT_PAYMENT_REQUEST_DELETE = '/merchant/payment-request/delete';
    static MERCHANT_PAYMENT_REQUEST_PAY = '/merchant/payment-request/pay';
    static MERCHANT_PAYMENT_REQUEST_CANCEL = '/merchant/payment-request/cancel';
    static MERCHANT_PAYMENT_REQUEST_APPROVE = '/merchant/payment-request/approve';
    static MERCHANT_PAYMENT_REQUEST_REJECT = '/merchant/payment-request/reject';
    static MERCHANT_PAYMENT_REQUEST_PAID = '/merchant/payment-request/paid';

}