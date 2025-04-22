// src/data.js
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas

const qrDataList = [];

// Function to add QR code data to the list
export const addQRData = (value) => {
  const qrCodeCanvas = document.createElement('canvas');
  // Use QRCodeCanvas to generate the QR code on the canvas
  const qrCode = new QRCodeCanvas({
    value,
    size: 128, // You can adjust the size here
    level: 'L', // Error correction level
    includeMargin: true,
  });

  // Once QR code is generated, extract the image data
  qrCode.toCanvas(qrCodeCanvas, () => {
    const imgData = qrCodeCanvas.toDataURL('image/png'); // Get base64 image data
    qrDataList.push({
      id: Date.now(), // unique ID for the QR
      value,
      imgData, // Base64 encoded image of the QR code
    });
  });
};

// Function to get all QR code data
export const getQRDataList = () => qrDataList;
