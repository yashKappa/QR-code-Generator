import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import docx from "html-docx-js/dist/html-docx";
import "./QrCodeGenerator.css"; // CSS file for styling

const QrCodeGenerator = () => {
  const [inputValue, setInputValue] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Generate QR code
  const handleGenerateQRCode = () => {
    if (inputValue.trim() !== "") {
      setShowQRCode(true);
    } else {
      alert("Please Enter text or URL");
    }
  };

  // Copy the QR code to clipboard
  const handleCopyQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.toBlob((blob) => {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]).then(() => {
          setShowCopiedMessage(true); // Show copied message for 4 seconds
          setTimeout(() => {
            setShowCopiedMessage(false);
          }, 4000);
        });
      });
    }
  };

  // Clear QR code and reset input
  const handleClearQRCode = () => {
    setInputValue("");
    setShowQRCode(false);
    setShowCopiedMessage(false);
  };

  // Handle download as PNG
  const downloadAsPNG = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.toBlob((blob) => {
        saveAs(blob, "QRCode.png");
      });
    }
    setShowDownloadModal(false);
  };

  // Handle download as PDF
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

  // Handle download as DOC
  const downloadAsDOC = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const imgData = canvas.toDataURL("image/png");
      const html = `<img src="${imgData}" />`;
      const blob = docx.asBlob(html);
      saveAs(blob, "QRCode.docx");
    }
    setShowDownloadModal(false);
  };

  // Show download modal
  const handleDownloadQRCode = () => {
    setShowDownloadModal(true);
  };

  return (
    <div className="container">
      <h1>QR Code Generator</h1>

      {/* Input field for user input */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter text or URL"
      />
      <button onClick={handleGenerateQRCode}>Generate QR Code</button>

      {/* QR Code display */}
      <div id="qrcode">
        {showQRCode && <QRCodeCanvas value={inputValue} width={128} />}
      </div>

      {/* Show buttons if QR code is displayed */}
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

      {/* Modal for download options */}
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

      {/* Copied message displayed for 4 seconds */}
      {showCopiedMessage && (
        <div id="copiedMessage">
          <p className="Msg">QR Code Copied!</p>
        </div>
      )}
    </div>
  );
};

export default QrCodeGenerator;
