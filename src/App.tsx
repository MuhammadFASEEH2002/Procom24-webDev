import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './Homepage/HomePage';
import MerchantLogin from './MerchantPortal/MerchantLogin';
import MerchantDashboard from './MerchantPortal/MerchantDashboard';
import CustomerLogin from './CustomerPortal/CustomerLogin';
import CustomerDashboard from './CustomerPortal/CustomerDashboard';
CustomerDashboard
function App() {
  return (
    <>
     <Router>
        <Routes>
          {/* Merchant Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/merchant/login" element={<MerchantLogin />} />
          <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
          {/* Customer Routes */}
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
