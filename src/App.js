import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home"; // Import the Home component
import QrCodeGenerator from "./QrCodeGenerator"; // Import the QR Code Generator component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/qrcode" element={<QrCodeGenerator />} /> {/* QR code generator route */}
      </Routes>
    </Router>
  );
};

export default App;
