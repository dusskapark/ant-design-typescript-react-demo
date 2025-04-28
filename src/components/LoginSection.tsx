import React from 'react';
import { Button, Typography, Space } from 'antd';
import { UnlockOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;

// --- Styles ---

const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '380px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
};

// New style for the wrapper around the middle content (Space)
const middleContentWrapperStyle: React.CSSProperties = {
    flexGrow: 1, // Take available space
    display: 'flex',
    alignItems: 'center', // Center vertically
    justifyContent: 'center', // Center horizontally
    padding: '20px 0', // Add some vertical padding if needed
};

const middleContentInnerStyle: React.CSSProperties = { // Style for the Space component itself
    width: '100%', // Ensure Space takes full width of its centered container
};

const welcomeTitleStyle: React.CSSProperties = {
    marginBottom: '8px',
};

const descriptionTextStyle: React.CSSProperties = {
    color: 'rgba(0, 0, 0, 0.65)',
    fontSize: '16px',
    marginBottom: '24px',
};

const loginButtonStyle: React.CSSProperties = {
    background: '#00B14F',
    borderColor: '#00B14F',
    fontWeight: 600,
    height: '52px',
    fontSize: '16px',
    borderRadius: '48px',
    padding: '0 40px',
    width: 'auto',
};

const troubleLinkContainerStyle: React.CSSProperties = {
    marginTop: '16px',
};

const troubleTextStyle: React.CSSProperties = {
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: '12px',
};

const troubleLinkStyle: React.CSSProperties = {
    color: 'rgba(0, 0, 0, 0.65)',
    fontSize: '12px',
};

const footerWrapperStyle: React.CSSProperties = {
    width: '100%',
    padding: '20px 0', // Add padding to footer area
    textAlign: 'left', // Center footer text
    flexShrink: 0,
};

const footerTextStyle: React.CSSProperties = {
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: '12px',
};

// --- Component Props --- Define props including the callback
interface LoginSectionProps {
    onLoginClick: () => void; // Define the prop type
}

// --- Component ---

const LoginSection: React.FC<LoginSectionProps> = ({ onLoginClick }) => {
    return (
        <div style={containerStyle}>
            {/* Placeholder for potential top elements like logo - keeps structure */}
            <div></div>

            {/* Middle Content Area - Now centered */}
            <div style={middleContentWrapperStyle}>
                <Space
                    direction="vertical"
                    size={32}
                    align="start"
                    style={middleContentInnerStyle}
                >
                    <Title level={2} style={welcomeTitleStyle}>
                        Welcome to Console
                    </Title>

                    <Text style={descriptionTextStyle}>
                        Manage all your tech tools and services in one unified platform.
                    </Text>

                    <Button
                        type="primary"
                        size="large"
                        icon={<UnlockOutlined />}
                        style={loginButtonStyle}
                        onClick={onLoginClick}
                    >
                        Login with Concedo
                    </Button>

                    {/* Trouble logging in link */}
                    <div style={troubleLinkContainerStyle}>
                        <Text style={troubleTextStyle}>
                            Trouble logging in?
                        </Text>
                        &nbsp;
                        <Link href="#" target="_blank" style={troubleLinkStyle}>
                            Click here.
                        </Link>
                    </div>
                </Space>
            </div>

            {/* Footer Area */}
            <div style={footerWrapperStyle}>
                <Text style={footerTextStyle}>
                    Console is brought to you by TechInfra (TI).
                </Text>
            </div>
        </div>
    );
};

export default LoginSection; 