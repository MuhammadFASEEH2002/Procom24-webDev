import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './Homepage/HomePage';
import MerchantLogin from './MerchantPortal/MerchantLogin';
import MerchantDashboard from './MerchantPortal/MerchantDashboard';
import CustomerLogin from './CustomerPortal/CustomerLogin';
import CustomerDashboard from './CustomerPortal/CustomerDashboard';
import MerchantPaymentRequest from './MerchantPortal/MerchantPaymentRequest';
import CustomerRegisteration from './CustomerPortal/CustomerRegisteration';
import CustomerLogout from './CustomerPortal/CustomerLogout';
import MerchantLogout from './MerchantPortal/MerchantLogout';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Merchant Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/merchant/login" element={<MerchantLogin />} />
          <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
          <Route path="/merchant/payment-request" element={<MerchantPaymentRequest />} />
          <Route path="/merchant/logout" element={<MerchantLogout />} />


          {/* Customer Routes */}
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/register" element={<CustomerRegisteration />} />

          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/logout" element={<CustomerLogout />} />



        </Routes>
      </Router>
    </>
  )
}

export default App
