import React from "react";
// Removed TypeIt, ErrorBoundary imports as animation is removed

// Removed SafeTypeIt component

// Removed resetKey from props
const AppLogo: React.FC = () => {
  const logoContainerStyle: React.CSSProperties = {
    display: "flex", 
    alignItems: "center",
    // Note: Ensure the custom fonts below are loaded in your project
    // font-family: "Grab Community EN v2.0", // For 'My'
    // font-family: "Grab Community Solid EN", // For 'Console'
  };

  // Styles for 'My' text
  const myTextStyle: React.CSSProperties = {
    color: "#1A1A1A", // --Content-Default fallback
    fontFamily: "'Grab Community EN v2.0', sans-serif", // Use specified font with fallback
    fontSize: "22px",
    fontStyle: "normal",
    fontWeight: 720, // Custom weight, ensure font supports it
    lineHeight: "normal",
    marginRight: "4px", // Add some space before the box
    // leading-trim and text-edge are non-standard CSS, omitted
  };

  // Styles for the 'Console' box container
  const consoleBoxContainerStyle: React.CSSProperties = {
    display: "flex",
    padding: "4px", // Padding around the inner box
    justifyContent: "center",
    alignItems: "center",
    gap: "8px", // This might not be needed if only text is inside
  };

  // Styles for the 'Console' inner box background/border
  const consoleBoxStyle: React.CSSProperties = {
    borderRadius: "4px",
    background: "#1A1A1A", // --Background-Default-Inverse fallback
    padding: "2px 8px" // Inner padding for the text
  };

  // Styles for 'Console' text
  const consoleTextStyle: React.CSSProperties = {
    color: "#FFF", // --Content-Default-Inverse fallback
    fontFamily: "'Grab Community Solid EN', sans-serif", // Use specified font with fallback
    fontSize: "22px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    letterSpacing: "-1.32px",
    // leading-trim and text-edge are non-standard CSS, omitted
  };

  return (
    <div style={logoContainerStyle}> 
      <span style={myTextStyle}>My</span>
      {/* Outer box for padding/alignment specified */}
      <div style={consoleBoxContainerStyle}> 
        {/* Inner box with background and text */}
        <div style={consoleBoxStyle}>
          <span style={consoleTextStyle}>Console</span>
        </div>
      </div>
    </div>
  );
};

export default AppLogo; 