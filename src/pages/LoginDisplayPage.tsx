import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginSection from '../components/LoginSection';
import TerminalAnimation from '../components/TerminalAnimation';
import AppLogo from '../components/AppLogo';
import { GradientBackground } from 'react-gradient-animation';

const LoginDisplayPage: React.FC = () => {
  const [resetKey, setResetKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsAnimating(true);
    console.log("Login animation triggered!");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAnimating && event.key === 'Enter') {
        console.log("Enter key pressed during animation, navigating...");
        navigate('/login-success');
      }
    };

    if (isAnimating) {
      window.addEventListener('keydown', handleKeyDown);
      console.log("Keydown listener added");
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      console.log("Keydown listener removed");
    };
  }, [isAnimating, navigate]);

  // --- Styles --- 

  // Style for the main page container (full height, flex row)
  const loginPageStyle: React.CSSProperties = {
    minHeight: '100vh', // Use viewport height
    display: 'flex',
    flexDirection: 'row', // Arrange sections side-by-side
    overflow: 'hidden', // Prevent layout shifts during potential animation
  };

  // Left section takes full height and arranges children vertically
  const leftSectionBaseStyle: React.CSSProperties = {
    flexShrink: 0,
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column', // Stack logo, content, footer vertically
    overflow: 'hidden',
    transition:
      'opacity 0.3s ease-out, width 0.5s ease-out 0.2s, padding 0.5s ease-out 0.2s, min-width 0.5s ease-out 0.2s',
  };

  const leftSectionStyle: React.CSSProperties = {
    ...leftSectionBaseStyle,
    flexBasis: isAnimating ? undefined : '35%',
    width: isAnimating ? '0px' : '35%',
    minWidth: isAnimating ? '0px' : undefined,
    padding: isAnimating ? '0px' : '0', // Padding will be handled by wrappers
    opacity: isAnimating ? 0 : 1,
  };

  // Re-introduced logoWrapperStyle
  const logoWrapperStyle: React.CSSProperties = {
    width: '100%',
    height: '52px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    flexShrink: 0,
    // Ensure padding animates out smoothly with width
    transition: 'padding 0.5s ease-out 0.2s', 
    paddingLeft: isAnimating ? '0px' : '24px',
    paddingRight: isAnimating ? '0px' : '24px',
  };

  // Re-introduced loginSectionWrapperStyle
  const loginSectionWrapperStyle: React.CSSProperties = {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    overflowY: 'auto',
    transition: 'opacity 0.2s ease-out, padding 0.5s ease-out 0.2s',
    opacity: isAnimating ? 0 : 1,
    paddingTop: isAnimating ? '0px' : '40px',
    paddingBottom: isAnimating ? '0px' : '40px',
    paddingLeft: isAnimating ? '0px' : '40px',
    paddingRight: isAnimating ? '0px' : '40px',
  };

  const rightSectionBaseStyle: React.CSSProperties = {
    flexGrow: 1,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    transition: 'flex-basis 0.5s ease-out 0.2s',
    cursor: isAnimating ? 'pointer' : 'default',
  };

  const rightSectionStyle: React.CSSProperties = {
    ...rightSectionBaseStyle,
    flexBasis: isAnimating ? '100%' : '65%',
  };

  const finalBackgroundStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(266deg, #005339 -1.18%, #00B14F 93.08%)',
    opacity: 0,
    zIndex: -1,
    transition: 'opacity 0.5s ease-in 0.5s'
  };

  const finalBackgroundStyleAnimating: React.CSSProperties = {
    ...finalBackgroundStyle,
    opacity: 1,
    zIndex: 1,
  };

  const handleRightSectionClick = () => {
    if (isAnimating) {
      console.log("Right section clicked during animation, navigating...");
      navigate('/login-success');
    }
  };

  return (
    // Use the basic div structure again
    <div style={loginPageStyle}>
      {/* Left Section */} 
      <div style={leftSectionStyle}>
        {/* Restore original structure inside left section */}
        {/* Conditionally render content based on animation */}
        {!isAnimating && (
          <>
            <div style={logoWrapperStyle}>
              <AppLogo />
            </div>
            <div style={loginSectionWrapperStyle}>
              <LoginSection onLoginClick={handleLoginClick} /> 
            </div>
          </>
        )}
      </div>

      {/* Right Section */} 
      <div style={rightSectionStyle} onClick={handleRightSectionClick}>
        <GradientBackground
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            zIndex: 0, 
            opacity: isAnimating ? 0 : 1, 
            transition: 'opacity 0.5s ease-out',
            pointerEvents: 'none',
          }} 
          count={6}
          speed={{ x: { min: 0.1, max: 0.4 }, y: { min: 0.1, max: 0.4 } }}
          colors={{
            background: '#004d40',
            particles: ['#00B14F', '#17B5A6', '#87ddfe', '#ffffff']
          }}
          blending="screen"
          opacity={{ center: 0.4, edge: 0.05 }}
          skew={-1}
          shapes={['c']}
        />
        <div style={isAnimating ? finalBackgroundStyleAnimating : finalBackgroundStyle}></div>
        <div style={{ zIndex: 2, position: 'relative', pointerEvents: 'none' }}>
          {/* Pass resetKey and isAnimating to TerminalAnimation */}
          <TerminalAnimation resetKey={resetKey} isAnimating={isAnimating} />
        </div>
      </div>
    </div>
  );
};

export default LoginDisplayPage;