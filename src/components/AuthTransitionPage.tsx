import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { 
  ErrorDisplay, 
  SuccessDisplay, 
  ProgressDisplay 
} from "./auth";
import { 
  DEFAULT_ESTIMATED_TIME, 
  ErrorType 
} from "../constants/auth";
import "../style/components.less";

interface AuthTransitionPageProps {
  titleOption?: number;
  estimatedTime?: number;
  showError?: boolean;
  errorType?: string;
  onRetry?: () => void;
  redirectUrl?: string;
  showRefreshNotice?: boolean;
}

/**
 * AuthTransitionPage component
 * Displays the authentication process with animations and status updates
 */
const AuthTransitionPage: React.FC<AuthTransitionPageProps> = ({
  titleOption = 0,
  estimatedTime = DEFAULT_ESTIMATED_TIME,
  showError = false,
  errorType = "BAD_REQUEST",
  onRetry,
  redirectUrl = "#",
  showRefreshNotice: externalShowRefreshNotice
}) => {
  // State variables
  const [countdown, setCountdown] = useState(estimatedTime);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [internalShowRefreshNotice, setInternalShowRefreshNotice] = useState(false);
  const [isSuccessAnimationComplete, setIsSuccessAnimationComplete] = useState(false);
  const [showErrorContent, setShowErrorContent] = useState(false);
  const [percent, setPercent] = useState(0);

  // Use external showRefreshNotice if provided, otherwise use internal state
  const showRefreshNotice = useMemo(() => 
    externalShowRefreshNotice !== undefined ? externalShowRefreshNotice : internalShowRefreshNotice,
  [externalShowRefreshNotice, internalShowRefreshNotice]);

  // Current progress and step
  const progress = currentProgress;
  const currentStep = useMemo(() => 
    progress >= 100 ? 2 : (progress > 33 ? 1 : 0),
  [progress]);

  // Progress calculation
  useEffect(() => {
    if (!showError && countdown > 0) {
      const progressInterval = setInterval(() => {
        setCurrentProgress(prev => {
          const newProgress = prev + (100 / (estimatedTime * 10));
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 100); // Update every 100ms for smoother animation

      return () => clearInterval(progressInterval);
    }
  }, [countdown, showError, estimatedTime]);

  // Percent animation for appropriate step based on current state
  useEffect(() => {
    if (!showError) {
      // For success flow
      if (currentStep === 1) {
        // "On the way" animation
        const percentInterval = setInterval(() => {
          setPercent(prev => {
            const newPercent = prev + 2; // Increment by 2% each time
            if (newPercent >= 100) {
              clearInterval(percentInterval);
              return 100;
            }
            return newPercent;
          });
        }, 200);
        
        return () => clearInterval(percentInterval);
      } else if (currentStep === 2 && !isSuccessAnimationComplete) {
        // "Delivered" animation
        const percentInterval = setInterval(() => {
          setPercent(prev => {
            const newPercent = prev + 4; // Faster for final step
            if (newPercent >= 100) {
              clearInterval(percentInterval);
              return 100;
            }
            return newPercent;
          });
        }, 100);
        
        return () => clearInterval(percentInterval);
      } else if (currentStep === 0) {
        setPercent(0); // Reset percent for prepare step
      }
    } else {
      // For error flow
      if (!showErrorContent) {
        const percentInterval = setInterval(() => {
          setPercent(prev => {
            const newPercent = prev + 2;
            if (newPercent >= 50) { // Only reach 50% for error
              clearInterval(percentInterval);
              return 50;
            }
            return newPercent;
          });
        }, 100);
        
        return () => clearInterval(percentInterval);
      }
    }
  }, [currentStep, showError, showErrorContent, isSuccessAnimationComplete]);

  // Error display timer
  useEffect(() => {
    if (showError && !showErrorContent) {
      const timer = setTimeout(() => {
        setShowErrorContent(true);
      }, 2000); // Show prepare stage for 2 seconds

      return () => clearTimeout(timer);
    }
  }, [showError]);

  // Countdown timer
  useEffect(() => {
    if (!showError && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prevCount => prevCount - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [countdown, showError]);

  // Show refresh notice after timeout if not explicitly set
  useEffect(() => {
    if (externalShowRefreshNotice === undefined && countdown <= 0) {
      setInternalShowRefreshNotice(true);
    }
  }, [countdown, externalShowRefreshNotice]);

  // Success animation completion timer
  useEffect(() => {
    if (currentStep === 2 && !isSuccessAnimationComplete) {
      const timer = setTimeout(() => {
        setIsSuccessAnimationComplete(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentStep, isSuccessAnimationComplete]);

  // Render the appropriate content based on the current state
  const renderContent = useCallback(() => {
    if (showError && showErrorContent) {
      return (
        <ErrorDisplay
          errorType={errorType as ErrorType}
          onRetry={onRetry}
          percent={percent}
          showErrorContent={showErrorContent}
        />
      );
    }

    if (currentStep === 2) {
      return (
        <SuccessDisplay
          redirectUrl={redirectUrl}
          isSuccessAnimationComplete={isSuccessAnimationComplete}
          percent={percent}
        />
      );
    }

    // Main content for step 0 (prepare) and step 1 (on the way)
    return (
      <ProgressDisplay
        titleOption={titleOption}
        currentStep={currentStep}
        progress={progress}
        percent={percent}
        showRefreshNotice={showRefreshNotice}
      />
    );
  }, [
    showError, 
    showErrorContent, 
    errorType, 
    onRetry, 
    currentStep, 
    redirectUrl, 
    isSuccessAnimationComplete, 
    percent, 
    titleOption, 
    progress, 
    showRefreshNotice
  ]);

  return (
    <div className="auth-transition-page">
      {/* Back to Settings Button - positioned at the top right */}
      <Button 
        onClick={onRetry} 
        icon={<ArrowLeftOutlined />}
        className="back-to-settings-button"
      >
        Back to Settings
      </Button>

      {/* Bottom Sheet Container */}
      <div className="bottom-sheet">
        {renderContent()}
      </div>
    </div>
  );
};

export default AuthTransitionPage; 