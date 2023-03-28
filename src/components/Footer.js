import React from "react";

const Footer = () => {
  const footerStyle = {
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    backgroundColor: "#f5f5f5",
    color: "#333",
    textAlign: "center",
  };

  return (
    <div style={footerStyle}>
      <p> Copyright © {new Date().getFullYear()} Nubedian - Intership</p>
    </div>
  );
};

export default Footer;
