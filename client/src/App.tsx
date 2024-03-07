import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from './Homepage/HomePage';


import MerchantLogin from './MerchantPortal/MerchantLogin';
import MerchantDashboard from './MerchantPortal/MerchantDashboard';
import MerchantPaymentRequest from './MerchantPortal/MerchantPaymentRequest';
import MerchantCustomers from './MerchantPortal/MerchantCustomers';
import MerchantPayments from './MerchantPortal/MertchantPayments';
import MerchantLogout from './MerchantPortal/MerchantLogout';


import CustomerLogin from './CustomerPortal/CustomerLogin';
import CustomerDashboard from './CustomerPortal/CustomerDashboard';
import CustomerRegister from './CustomerPortal/CustomerRegister';
import CustomerLogout from './CustomerPortal/CustomerLogout';
import CustomerPayments from './CustomerPortal/CustomerPayments';


import RoutesPath from './utils/routes';


function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Merchant Routes */}
          <Route path={RoutesPath.HOME} element={<HomePage />} />
          <Route path={RoutesPath.MERCHANT_LOGIN} element={<MerchantLogin />} />
          <Route path={RoutesPath.MERCHANT_DASHBOARD} element={<MerchantDashboard />} />
          <Route path={RoutesPath.MERCHANT_CUSTOMERS} element={<MerchantCustomers />} />
          <Route path={RoutesPath.MERCHANT_PAYMENTS} element={<MerchantPayments />} />
          <Route path={RoutesPath.MERCHANT_PAYMENT_REQUEST} element={<MerchantPaymentRequest />} />
          <Route path={RoutesPath.MERCHANT_LOGOUT} element={<MerchantLogout />} />


          {/* Customer Routes */}
          <Route path={RoutesPath.CUSTOMER_LOGIN} element={<CustomerLogin />} />
          <Route path={RoutesPath.CUSTOMER_REGISTER} element={<CustomerRegister />} />
          <Route path={RoutesPath.CUSTOMER_PAYMENTS} element={<CustomerPayments />} />

          <Route path={RoutesPath.CUSTOMER_DASHBOARD} element={<CustomerDashboard />} />
          <Route path={RoutesPath.CUSTOMER_LOGOUT} element={<CustomerLogout />} />



        </Routes>
      </Router>
    </>
  )
}

export default App
