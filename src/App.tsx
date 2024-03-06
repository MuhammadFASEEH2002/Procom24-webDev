import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './Homepage/HomePage';
import MerchantLogin from './MerchantPortal/MerchantLogin';

function App() {
  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/merchant/login" element={<MerchantLogin />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
