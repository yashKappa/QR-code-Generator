import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import './Home.css'; // Import CSS file


const Home = () => {
  return (
    <div className="back">
     <div className="text">
     <h2>Welcome to the QR Code Generator App!</h2>
      <p>This is the home page. Navigate to the QR Code Generator from here.</p>
      {/* Add a link to navigate to the QR Code Generator */}
      <Link to="/qrcode">Go to QR Code Generator</Link> {/* Link to QR code generator */}
     </div>

    
      {/* Floating shapes with different classes */}
      <div className="shape small"></div>
      <div className="shape medium"></div>
      <div className="shape large"></div>
      <div className="shape extra-large"></div>
      <div className="shape xlarge"></div>

      {/* New shapes with fast movement */}
      <div className="shape new-one"></div>
      <div className="shape new-two"></div>
      <div className="shape new-three"></div>
      <div className="shape new-four"></div>
      <div className="shape new-five"></div>

      <div className="shape left-one"></div>
      <div className="shape left-two"></div>
      <div className="shape left-three"></div>
      <div className="shape left-four"></div>
      <div className="shape left-five"></div>

    </div>
  );
};

export default Home;
