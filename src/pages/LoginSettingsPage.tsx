import React, { useState } from 'react';
import { Button, Card, Typography, Radio, Select, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { scriptDefinitions } from '../constants/terminalScripts';

const { Title, Paragraph } = Typography;
const { Option } = Select;

// Define script titles based on comments/order in terminalScripts.ts
const scriptTitles = [
  "Script 1: Welcome Script",
  "Script 2: System Check Script",
  "Script 3: Connection Script",
  "Script 4: Login Success Script (Fast)"
];

const LoginSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState('terminal'); // Default to terminal
  const [selectedScriptIndex, setSelectedScriptIndex] = useState(0); // Default to first script

  const handleShowLogin = () => {
    // Add style and script index to the navigation URL
    navigate(`/login?mode=display&style=${selectedStyle}&script=${selectedScriptIndex}`);
  };

  return (
    <Card title="Login Page Configuration (Preview)">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Paragraph>
          Select the style and options for the login page preview.
        </Paragraph>

        <Space direction="vertical">
          <Title level={5}>Login Page Style:</Title>
          <Radio.Group 
            onChange={(e) => setSelectedStyle(e.target.value)} 
            value={selectedStyle}
          >
            <Radio value="terminal">Terminal Style</Radio>
            <Radio value="advertisement" disabled>Advertising Style (Not Available)</Radio>
          </Radio.Group>
        </Space>
        
        {/* Conditionally render script selector only for Terminal style */}
        {selectedStyle === 'terminal' && (
          <Space direction="vertical">
            <Title level={5}>Terminal Animation Script:</Title>
            <Select 
              value={selectedScriptIndex} 
              style={{ width: 250 }} 
              onChange={(value) => setSelectedScriptIndex(value)}
            >
              {scriptDefinitions.map((_, index) => (
                <Option key={index} value={index}>
                  {scriptTitles[index] || `Script ${index + 1}`}{/* Use title or fallback */}
                </Option>
              ))}
            </Select>
          </Space>
        )}

        <Button type="primary" size="large" onClick={handleShowLogin}>
          Show Login Page UI (Preview)
        </Button>
      </Space>
    </Card>
  );
};

export default LoginSettingsPage; 