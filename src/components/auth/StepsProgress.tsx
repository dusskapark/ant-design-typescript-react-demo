import React from "react";
import { Steps } from "antd";
import type { StepProps } from "antd";
import { STEP_TITLES } from "../../constants/auth";
import "../../style/components.less";

interface StepsProgressProps {
  current: number;
  percent: number;
  status?: "error" | "wait" | "process" | "finish";
  isSuccess?: boolean;
  isError?: boolean;
  isSuccessAnimationComplete?: boolean;
  className?: string;
}

/**
 * StepsProgress component
 * Displays a progress bar with steps for the authentication flow
 */
const StepsProgress: React.FC<StepsProgressProps> = ({
  current,
  percent,
  status,
  isSuccess = false,
  isError = false,
  isSuccessAnimationComplete = false,
  className
}) => {
  // Success steps configuration
  const getSuccessSteps = (): StepProps[] => [
    { 
      title: STEP_TITLES.PREPARING, 
      status: "finish"
    },
    { 
      title: STEP_TITLES.ON_THE_WAY, 
      status: "finish"
    },
    {
      title: STEP_TITLES.DELIVERED,
      status: isSuccessAnimationComplete ? "finish" : "process"
    }
  ];

  // Error steps configuration
  const getErrorSteps = (): StepProps[] => [
    { 
      title: STEP_TITLES.PREPARING, 
      status: "finish"
    },
    { 
      title: STEP_TITLES.ON_THE_WAY, 
      status: "error"
    },
    { 
      title: STEP_TITLES.DELIVERED,
      status: "wait"
    }
  ];

  // Regular steps configuration
  const getRegularSteps = (): StepProps[] => [
    { 
      title: STEP_TITLES.PREPARING, 
      status: current > 0 ? "finish" : "process"
    },
    { 
      title: STEP_TITLES.ON_THE_WAY,
      status: current > 1 ? "finish" : (current === 1 ? "process" : "wait")
    },
    { 
      title: STEP_TITLES.DELIVERED,
      status: "wait"
    }
  ];

  // Determine which steps to use
  const getStepsItems = () => {
    if (isSuccess) {
      return getSuccessSteps();
    } else if (isError) {
      return getErrorSteps();
    } else {
      return getRegularSteps();
    }
  };

  return (
    <div className="steps-container">
      <div className="steps-wrapper">
        <Steps
          current={current}
          size="small"
          status={status}
          percent={percent}
          className={`auth-steps ${className || ""}`}
          items={getStepsItems()}
        />
      </div>
    </div>
  );
};

export default StepsProgress; 