import React, { useState, useEffect } from "react";
import { Button, Card, Space, Divider } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";

interface MainPageProps {
  resetKey?: number;
  resetAnimation?: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ resetKey: externalResetKey, resetAnimation: externalResetAnimation }) => {
  const navigate = useNavigate();
  
  // Local state for animation reset if needed
  const [localResetKey, setLocalResetKey] = useState(0);
  
  // Use either the external or local reset key
  const resetKey = externalResetKey !== undefined ? externalResetKey : localResetKey;
  
  // Title and content options for the auth page
  const [titleOptionIndex, setTitleOptionIndex] = useState(0);
  const [contentOptionIndex, setContentOptionIndex] = useState(0);
  
  // Function to navigate to auth page
  const goToAuthPage = () => {
    navigate(`/auth?title=${titleOptionIndex}&content=${contentOptionIndex}`);
  };
  
  // Function to change title/content options
  const changeOptions = () => {
    setTitleOptionIndex((prev) => (prev + 1) % 5);
    setContentOptionIndex((prev) => (prev + 1) % 5);
  };

  const breadcrumbItems = [
    { title: "Home" },
    { title: "Auth Demo" },
  ];

  return (
    <MainLayout 
      breadcrumbItems={breadcrumbItems}
      defaultOpenKeys={["sub2"]}
    >
      <div>
        <h1 className="text-2xl font-bold mb-5">Auth Transition Demo</h1>
        
        <Space direction="vertical" size="large" style={{ width: "100%", padding: "20px 0" }}>
          <Card title="Authentication Transition Page">
            <p className="mb-5">
              This demo simulates the auth transition page that appears when moving between services 
              with token exchange. The page shows a loading animation while authentication is being processed.
            </p>
            
            <Space>
              <Button 
                type="primary" 
                icon={<LoginOutlined />} 
                onClick={goToAuthPage}
              >
                Show Auth Transition Page
              </Button>
              
              <Button onClick={changeOptions}>
                Change Title/Content Options
              </Button>
            </Space>
            
            <Divider />
            
            <div style={{ marginTop: "20px" }}>
              <p>Current Title Option: {titleOptionIndex + 1}</p>
              <p>Current Content Option: {contentOptionIndex + 1}</p>
              <p>Click the button above to view the Auth Transition Page with these options.</p>
              <p>Click "Change Options" to cycle through different title and content combinations.</p>
            </div>
          </Card>
        </Space>
      </div>
    </MainLayout>
  );
};

export default MainPage; 