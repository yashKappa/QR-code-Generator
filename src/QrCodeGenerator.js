import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import docx from "html-docx-js/dist/html-docx";
import "./QrCodeGenerator.css";

const QrCodeGenerator = () => {
  const [inputValue, setInputValue] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [scannedData, setScannedData] = useState(""); // Store scanned data

  const handleGenerateQRCode = () => {
    if (inputValue.trim() !== "") {
      setShowQRCode(true);
    } else {
      alert("Please Enter text or upload an image");
    }
  };

  const handleCopyQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.toBlob((blob) => {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]).then(() => {
          setShowCopiedMessage(true);
          setTimeout(() => setShowCopiedMessage(false), 4000);
        });
      });
    }
  };

  const handleClearQRCode = () => {
    setInputValue("");
    setImagePreview(null);
    setShowQRCode(false);
    setShowCopiedMessage(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file); // blob URL
      setImagePreview(imageURL); // show preview
      setInputValue(imageURL); // encode this URL in QR
    }
  };

  const downloadAsPNG = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.toBlob((blob) => saveAs(blob, "QRCode.png"));
    }
    setShowDownloadModal(false);
  };

  const downloadAsPDF = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("QRCode.pdf");
    }
    setShowDownloadModal(false);
  };

  const downloadAsDOC = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const imgData = canvas.toDataURL("image/png");
      const html = <img src="${imgData}" />;
      const blob = docx.asBlob(html);
      saveAs(blob, "QRCode.docx");
    }
    setShowDownloadModal(false);
  };

  const handleDownloadQRCode = () => setShowDownloadModal(true);

  const handleScanQRCode = (scannedText) => {
    // This function is triggered after scanning the QR code
    setScannedData(scannedText); // Store the scanned data
  };

  const handleGoToWebsite = () => {
    // Check if the scanned data is a valid URL
    if (isValidURL(scannedData)) {
      window.open(scannedData, "_blank");
    } else {
      alert("Scanned data is not a valid URL");
    }
  };

  const isValidURL = (str) => {
    // Regex to check if the string is a valid URL
    const pattern = new RegExp(
      "^(https?:\\/\\/)?([\\w\\d\\-]+)\\.([a-z]{2,})([\\/\\w\\d\\-\\?=&#]*)?$",
      "i"
    );
    return pattern.test(str);
  };

  return (
    <>
      <div className="container">
        <h1 className="head">QR Code Generator</h1>

        {/* Textarea + Image Upload */}
        <textarea
          rows="4"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter text or image URL"
        ></textarea>

        <div className="photo">
          <label>Select Photo
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>

          {/* Preview Uploaded Image */}
          {imagePreview && (
            <div className="preview">
              <img src={imagePreview} alt="Preview" width="200" />
            </div>
          )}
        </div>

        <button onClick={handleGenerateQRCode}>Generate QR Code</button>

        {/* QR Code */}
        <div id="qrcode">
          {showQRCode && <QRCodeCanvas value={inputValue} size={128} />}
        </div>

        {showQRCode && (
          <div className="btn">
            <button id="copyBtn" onClick={handleCopyQRCode}>
              Copy QR Code
            </button>
            <button id="downloadBtn" onClick={handleDownloadQRCode}>
              Download QR Code
            </button>
            <button id="clearBtn" onClick={handleClearQRCode}>
              Clear
            </button>
          </div>
        )}

        {/* Download Modal */}
        {showDownloadModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Select Download Format</h3>
              <button onClick={downloadAsPNG}>Download as PNG</button>
              <button onClick={downloadAsPDF}>Download as PDF</button>
              <button onClick={downloadAsDOC}>Download as DOC</button>
              <div className="clear">
                <button id="clearBtn" onClick={() => setShowDownloadModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Copied Message */}
        {showCopiedMessage && (
          <div id="copiedMessage">
            <p className="Msg">QR Code Copied!</p>
          </div>
        )}

        {/* Scanned Data Display */}
        {scannedData && (
          <div>
            <p>Scanned Data:</p>
            <p>{scannedData}</p>

            {/* Button to go to the website if scanned data is a URL */}
            <button onClick={handleGoToWebsite}>Go to Site</button>
          </div>
        )}
      </div>

      <section>
        {[...Array(10)].map((_, i) => (
          <span key={i}></span>
        ))}
      </section>
    </>
  );
};

export default QrCodeGenerator;
