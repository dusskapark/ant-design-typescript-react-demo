import React, { useState, useEffect } from 'react';
import { Typography, Button, Layout } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;



const LoginSuccessPage: React.FC = () => {
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const navigate = useNavigate();
  const [resetKey, setResetKey] = useState(0); // Add resetKey state here

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSheetVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGoToSettings = () => {
    navigate('/login');
  };

  const layoutStyle: React.CSSProperties = {
    minHeight: '100vh',
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    height: '56px',
    lineHeight: '56px',
    position: 'relative',
    zIndex: 1,
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };

  const backgroundStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(266deg, #005339 -1.18%, #00B14F 93.08%)',
    zIndex: 0,
  };

  const bottomSheetStyle: React.CSSProperties = {
    width: '100%',
    height: 'calc(100vh - 56px)', // Adjusted height calculation
    backgroundColor: '#fff',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
    borderRadius: '24px 24px 0 0',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transform: isSheetVisible ? 'translateY(0%)' : 'translateY(100%)',
    transition: 'transform 0.5s ease-out',
    zIndex: 10,
    position: 'relative',
  };

  return (
    <Layout style={layoutStyle}>
      <div style={backgroundStyle}>
        <Header style={headerStyle}>
          Logo
        </Header>
        <Content style={contentStyle}>

          <div style={bottomSheetStyle}>
            <CheckCircleOutlined style={{ fontSize: '64px', color: '#52c41a', marginBottom: '24px' }} />
            <Title level={2}>Login Successful!</Title>
            <Paragraph style={{ marginBottom: '32px', textAlign: 'center' }}>
              You have been successfully logged in. You can now configure your settings.
            </Paragraph>
            <Button type="primary" size="large" onClick={handleGoToSettings}>
              Go to Settings
            </Button>
          </div>
        </Content>
      </div>
    </Layout>
  );
};

export default LoginSuccessPage; 