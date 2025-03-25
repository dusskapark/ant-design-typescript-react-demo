import React from "react";
import { Typography, Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { STEP_CONTENT } from "../../constants/auth";
import AnimationPlayer from "./AnimationPlayer";
import StepsProgress from "./StepsProgress";
import "../../style/components.less";

const { Title, Paragraph } = Typography;

interface SuccessDisplayProps {
  redirectUrl: string;
  isSuccessAnimationComplete: boolean;
  percent: number;
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
 * SuccessDisplay component
 * Displays success information with animation and redirect button
 */
const SuccessDisplay: React.FC<SuccessDisplayProps> = ({
  redirectUrl,
  isSuccessAnimationComplete,
  percent
}) => {
  // Content for the success step
  const successContent = STEP_CONTENT[2];

  return (
    <>
      <AnimationPlayer
        type="success"
        loop={true}
      />

      <Title level={2} className="auth-title">
        Authentication Successful!
      </Title>

      <StepsProgress
        current={2}
        percent={isSuccessAnimationComplete ? 100 : percent}
        isSuccess={true}
        isSuccessAnimationComplete={isSuccessAnimationComplete}
      />

      <Paragraph className="auth-paragraph">
        {formatContent(successContent)}
      </Paragraph>

      {isSuccessAnimationComplete && (
        <Button
          type="primary"
          size="large"
          className="auth-button"
          onClick={() => window.location.href = redirectUrl}
        >
          Open it manually <ExportOutlined />
        </Button>
      )}
    </>
  );
};

export default SuccessDisplay; 