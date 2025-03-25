import React from "react";
import { Typography, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { ERROR_TYPES, ErrorType } from "../../constants/auth";
import AnimationPlayer from "./AnimationPlayer";
import StepsProgress from "./StepsProgress";
import "../../style/components.less";

const { Title, Paragraph, Text } = Typography;

interface ErrorDisplayProps {
  errorType: ErrorType | string;
  onRetry?: () => void;
  percent: number;
  showErrorContent: boolean;
}

/**
 * ErrorDisplay component
 * Displays error information with animation and retry option
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  errorType,
  onRetry,
  percent,
  showErrorContent
}) => {
  // Check if it's a timeout error
  const isTimeoutError = errorType === "TIMEOUT";
  
  // Get error information
  const errorInfo = ERROR_TYPES[errorType as keyof typeof ERROR_TYPES];

  if (!errorInfo) {
    return null;
  }

  return (
    <>
      <AnimationPlayer
        type={isTimeoutError ? "timeout" : "error"}
        loop={true}
      />

      <Title level={2} className="auth-title">
        {errorInfo.title}
      </Title>

      <StepsProgress
        current={1}
        percent={showErrorContent ? 50 : percent}
        status="error"
        isError={true}
      />

      <Paragraph className="auth-paragraph">
        <Text strong className="auth-error-text">
          {errorInfo.code}
        </Text>
        <Text className="auth-error-message">
          {errorInfo.message}
        </Text>
      </Paragraph>

      {onRetry && (
        <Button
          type="default"
          ghost
          icon={<ReloadOutlined />}
          size="large"
          onClick={onRetry}
          className="auth-retry-button"
          danger
        >
          Retry
        </Button>
      )}
    </>
  );
};

export default ErrorDisplay; 