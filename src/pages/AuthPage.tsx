import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Card, Radio, Space, Typography, Select, InputNumber, Tabs } from "antd";
import AuthTransitionPage from "../components/AuthTransitionPage";
import { SettingOutlined } from "@ant-design/icons";
import { ERROR_TYPES, TITLE_OPTIONS, DEFAULT_ESTIMATED_TIME } from "../constants/auth";
import "../style/components.less";
import { MarkdownContent } from "../utils/markdown";
import readmeContent from "../components/AuthTransitionPage.md?raw";

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface AuthPageProps {
  resetKey?: number;
  resetAnimation?: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ resetKey, resetAnimation }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get parameters from URL
  const titleOption = parseInt(searchParams.get("title") || "0", 10);
  const mode = searchParams.get("mode") || "settings";
  const estimatedTime = parseInt(searchParams.get("time") || DEFAULT_ESTIMATED_TIME.toString(), 10);
  const showError = searchParams.get("showError") === "true";
  const errorType = searchParams.get("errorType") || "BAD_REQUEST";
  const showRefreshNotice = searchParams.get("showRefresh") === "true";
  
  // State for settings
  const [selectedTitleOption, setSelectedTitleOption] = useState(titleOption);
  const [countdownTime, setCountdownTime] = useState(estimatedTime);
  const [selectedErrorType, setSelectedErrorType] = useState(errorType);
  const [errorMode, setErrorMode] = useState(showError ? "error" : "success");
  const [selectedShowRefreshNotice, setSelectedShowRefreshNotice] = useState(showRefreshNotice);
  
  // Preview button click
  const handlePreview = () => {
    setSearchParams({
      mode: "preview",
      title: selectedTitleOption.toString(),
      showError: errorMode !== "success" ? "true" : "false",
      errorType: errorMode === "success" ? "BAD_REQUEST" : selectedErrorType,
      time: countdownTime.toString(),
      showRefresh: selectedShowRefreshNotice ? "true" : "false"
    });
  };
  
  // Retry in error state
  const handleRetry = () => {
    // In real case, this would initiate a new authentication attempt
    // For demo, just go back to settings
    navigate("/auth?mode=settings");
  };
  
  // Return to main page
  const handleReturn = () => {
    navigate("/");
  };
  
  // Return to settings from preview
  const handleReturnToSettings = () => {
    navigate("/auth?mode=settings");
  };

  // Tab items for settings
  const tabItems = [
    {
      key: 'settings',
      label: 'Settings',
      children: (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Card title="Transition Display Options">
            <Space direction="vertical" style={{ width: "100%" }} size="middle">
              <div>
                <Title level={5}>Title</Title>
                <Select 
                  style={{ width: "100%" }} 
                  value={selectedTitleOption}
                  onChange={(value) => setSelectedTitleOption(Number(value))}
                >
                  {TITLE_OPTIONS.map((title, index) => (
                    <Option key={index} value={index}>{title}</Option>
                  ))}
                </Select>
              </div>
              
              <div>
                <Title level={5}>Animation Duration (seconds)</Title>
                <InputNumber 
                  min={3} 
                  max={30} 
                  value={countdownTime}
                  onChange={(value) => setCountdownTime(value || 10)}
                />
              </div>
              
              <div>
                <Title level={5}>Show Refresh Notice</Title>
                <Radio.Group 
                  value={selectedShowRefreshNotice} 
                  onChange={(e) => setSelectedShowRefreshNotice(e.target.value)}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
                <Paragraph style={{ fontSize: "12px", color: "#888", marginTop: "8px" }}>
                  When enabled, a refresh notice will appear if the authentication process takes longer than expected.
                </Paragraph>
              </div>
              
              <div>
                <Title level={5}>Authentication Error</Title>
                <Radio.Group 
                  value={errorMode} 
                  onChange={(e) => setErrorMode(e.target.value)}
                >
                  <Radio value="success">Success Mode</Radio>
                  <Radio value="error">Error Mode</Radio>
                </Radio.Group>

                {errorMode === "error" && (
                  <div style={{ marginTop: "16px" }}>
                    <Title level={5}>Error Type</Title>
                    <Select
                      style={{ width: "100%" }}
                      value={selectedErrorType}
                      onChange={(value) => setSelectedErrorType(value)}
                    >
                      {Object.entries(ERROR_TYPES)
                        .map(([key, value]) => (
                          <Option key={key} value={key}>
                            {value.code} - {value.title}
                          </Option>
                        ))}
                    </Select>
                  </div>
                )}

                <Paragraph style={{ fontSize: "12px", color: "#888", marginTop: "8px" }}>
                  In a real application, errors would be shown based on the actual authentication result.
                  For demo purposes, this simulates different error states.
                </Paragraph>
              </div>
            </Space>
          </Card>
          
          <Card>
            <Button type="primary" size="large" onClick={handlePreview}>
              Preview Transition
            </Button>
          </Card>
        </Space>
      ),
    },
    {
      key: 'documentation',
      label: 'Documentation',
      children: (
        <Card>
          <MarkdownContent content={readmeContent} />
        </Card>
      ),
    },
  ];
  
  // Settings view
  if (mode === "settings") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-5">Authentication Transition Settings</h1>
        
        <Button
          type="default"
          htmlType="button"
          icon={<SettingOutlined />}
          onClick={handleReturn}
          className="mt-5 mb-5"
        >
          Return to Main Page
        </Button>

        <Tabs defaultActiveKey="settings" items={tabItems} />
      </div>
    );
  }
  
  // Preview mode
  return (
    <div className="auth-page-preview">
      <AuthTransitionPage 
        titleOption={selectedTitleOption}
        estimatedTime={countdownTime}
        showError={errorMode !== "success"}
        errorType={selectedErrorType}
        onRetry={handleRetry}
        showRefreshNotice={selectedShowRefreshNotice}
      />
    </div>
  );
};

export default AuthPage; 