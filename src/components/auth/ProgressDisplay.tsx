import React from "react";
import { Typography, Alert, Button } from "antd";
import { STEP_CONTENT, TITLE_OPTIONS } from "../../constants/auth";
import AnimationPlayer from "./AnimationPlayer";
import StepsProgress from "./StepsProgress";
import "../../style/components.less";

const { Title, Paragraph } = Typography;

interface ProgressDisplayProps {
  titleOption: number;
  currentStep: number;
  progress: number;
  percent: number;
  showRefreshNotice: boolean;
}

/**
 * Helper function to convert \n to <br />
 */
const formatContent = (text: string) => {
  return text.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
};

/**
 * ProgressDisplay component
 * Displays the current progress of authentication with animation
 */
const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  titleOption,
  currentStep,
  progress,
  percent,
  showRefreshNotice
}) => {
  // Title and content for the current step
  const title = TITLE_OPTIONS[titleOption % TITLE_OPTIONS.length];
  const stepContent = STEP_CONTENT[currentStep];

  return (
    <>
      <AnimationPlayer
        type="motorcycle"
        loop={true}
      />

      <Title level={2} className="auth-title">
        {title}
      </Title>

      <StepsProgress
        current={currentStep}
        percent={currentStep === 0 ? Math.min(100, progress * 3) : (currentStep === 1 ? percent : 0)}
      />

      <Paragraph className="auth-paragraph">
        {formatContent(stepContent)}
      </Paragraph>
    
      {/* Refresh notice after timeout */}
      {showRefreshNotice && (
        <div className="auth-refresh-notice">
          <Alert
            message="Still Waiting?"
            description="The authentication is taking longer than expected."
            type="warning"
            showIcon
            className="ant-alert"
            action={
              <Button
                size="small"
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
            }
          />
        </div>
      )}
    </>
  );
};

export default ProgressDisplay; 