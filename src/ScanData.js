// src/ScanData.js

import React, { useEffect, useState } from "react";
import { getQRDataList } from "./data"; // Import the function to fetch QR data

const ScanData = ({ match }) => {
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    const qrId = match.params.id; // Get the QR code ID from the URL params
    const qrDataList = getQRDataList();
    const qr = qrDataList.find((data) => data.id === parseInt(qrId));
    
    if (qr) {
      setQrData(qr); // Set the QR data (value + image)
    } else {
      alert("QR Data not found!");
    }
  }, [match.params.id]);

  if (!qrData) return <div>Loading...</div>;

  return (
    <div className="scan-data">
      <h2>Scanned QR Code Data</h2>
      <p>Value: {qrData.value}</p>
      <div>
        <h3>QR Code Image</h3>
        <img src={qrData.imgData} alt="Scanned QR" width="200" />
      </div>
    </div>
  );
};

export default ScanData;
