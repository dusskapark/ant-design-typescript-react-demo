import React, { useState, useEffect, useMemo } from 'react';
import TypeIt from 'typeit-react';
import ErrorBoundary from "./ErrorBoundary"; // Assuming ErrorBoundary exists
import styles from './TerminalAnimation.module.css'; // Import CSS module
import { scriptDefinitions, LOGIN_SUCCESS_SCRIPT_INDEX } from '../constants/terminalScripts'; // Import scripts and index
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Safe TypeIt component (Consider moving to a shared location)
const SafeTypeIt: React.FC<any> = (props) => {
  return (
    <ErrorBoundary>
      <TypeIt {...props} />
    </ErrorBoundary>
  );
};

// --- Component Props ---
interface TerminalAnimationProps {
  resetKey?: number;
  isAnimating?: boolean; // New prop to trigger login success script
}

// --- Component Implementation ---
const TerminalAnimation: React.FC<TerminalAnimationProps> = ({ resetKey = 0, isAnimating = false }) => {
  const navigate = useNavigate(); // Get navigate function
  // State to hold the currently selected script function
  const [currentScript, setCurrentScript] = useState<Function | null>(null);
  const [scriptIdentifier, setScriptIdentifier] = useState<string | number>('initial');

  // Select initial random script on mount OR when resetKey changes
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * scriptDefinitions.length);
    // Avoid selecting the login success script randomly initially
    const initialScriptIndex = randomIndex === LOGIN_SUCCESS_SCRIPT_INDEX 
                               ? (randomIndex + 1) % scriptDefinitions.length 
                               : randomIndex;
    setCurrentScript(() => scriptDefinitions[initialScriptIndex]); // Use function update to ensure latest state
    setScriptIdentifier(`random-${initialScriptIndex}-${resetKey}`);
    console.log('Initial/Reset script selected:', initialScriptIndex);
  }, [resetKey]); // Re-run only when resetKey changes

  // Effect to switch to login success script when isAnimating becomes true
  useEffect(() => {
    if (isAnimating) {
      console.log('Switching to login success script');
      setCurrentScript(() => scriptDefinitions[LOGIN_SUCCESS_SCRIPT_INDEX]);
      setScriptIdentifier(`login-success-${resetKey}`);
    }
    // We don't necessarily want to switch back if isAnimating becomes false
  }, [isAnimating, resetKey]); // Depend on isAnimating and resetKey

  // Memoize the getBeforeInit function to avoid unnecessary re-renders if script hasn't changed
  const getBeforeInitCallback = useMemo(() => {
    return currentScript 
      ? (instance: any) => currentScript(instance, styles, navigate) // Pass navigate
      : undefined;
  }, [currentScript, navigate]); // Add navigate to dependencies

  // Ensure component re-mounts when scriptIdentifier changes
  const typeItKey = `terminal-${scriptIdentifier}`;

  return (
    <div className={styles.terminal}>
      <div className={styles.terminalHeader}>
        <div className={styles.terminalButtons}>
          <span className={`${styles.terminalButton} ${styles.red}`}></span>
          <span className={`${styles.terminalButton} ${styles.yellow}`}></span>
          <span className={`${styles.terminalButton} ${styles.green}`}></span>
        </div>
        <div className={styles.terminalTitle}>MyConsole Terminal</div>
      </div>
      <div className={styles.terminalBody}>
        {currentScript && ( // Render only when a script is selected
          <SafeTypeIt
            key={typeItKey} // Use dynamic key for re-mount
            options={{
              speed: 60,
              waitUntilVisible: true,
              lifeLike: true,
              cursorChar: '_',
            }}
            getBeforeInit={getBeforeInitCallback} 
          />
        )}
      </div>
    </div>
  );
};

export default TerminalAnimation; 