import React, { useState, useRef, Component, ErrorInfo } from 'react';
import { DashboardOutlined, AppstoreOutlined, SettingOutlined, ReloadOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Button, Divider, Card, Space, Alert } from 'antd';
import TypeIt from 'typeit-react';
import './style/index.less';

const { Header, Content, Sider } = Layout;

// Top navigation menu items
const items1: MenuProps['items'] = [
  {
    key: '1',
    label: 'Dashboard',
  },
  {
    key: '2',
    label: 'Applications',
  },
  {
    key: '3',
    label: 'Settings',
  },
];

// Side menu items with icons and sub-menus
const items2: MenuProps['items'] = [
  {
    key: 'sub1',
    icon: React.createElement(DashboardOutlined),
    label: 'Dashboard',
    children: [
      { key: '1', label: 'Overview' },
      { key: '2', label: 'Analytics' },
      { key: '3', label: 'Monitoring' },
      { key: '4', label: 'Reports' },
    ],
  },
  {
    key: 'sub2',
    icon: React.createElement(AppstoreOutlined),
    label: 'Applications',
    children: [
      { key: '5', label: 'Active Apps' },
      { key: '6', label: 'App Store' },
      { key: '7', label: 'Deployments' },
      { key: '8', label: 'Resources' },
    ],
  },
  {
    key: 'sub3',
    icon: React.createElement(SettingOutlined),
    label: 'Settings',
    children: [
      { key: '9', label: 'Account' },
      { key: '10', label: 'Preferences' },
      { key: '11', label: 'Security' },
      { key: '12', label: 'Notifications' },
    ],
  },
];

// Error Boundary 컴포넌트
class ErrorBoundary extends Component<
  { children: React.ReactNode, fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode, fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <Alert
          message="Component Error"
          description="There was an error rendering this component."
          type="error"
          showIcon
        />
      );
    }

    return this.props.children;
  }
}

// TypeIt 안전 래퍼 컴포넌트
const SafeTypeIt: React.FC<any> = (props) => {
  return (
    <ErrorBoundary>
      <TypeIt {...props} />
    </ErrorBoundary>
  );
};

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  // State to reset the animation
  const [resetKey, setResetKey] = useState(0);
  
  // Function to reset animation
  const resetAnimation = () => {
    // 간단하게 resetKey를 증가시켜 컴포넌트를 새로 마운트
    setResetKey(prev => prev + 1);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="logo-container">
          <span className="grab-logo">Grab</span>
          <div className="console-container">
            <div className="console-text">
              <SafeTypeIt
                key={`logo-${resetKey}`}
                options={{
                  cursor: true,
                  cursorChar: "|",
                  cursorSpeed: 1000,
                  lifeLike: true,
                  speed: 75,
                  afterComplete: (instance) => {
                    // Hide cursor after completion
                    try {
                      setTimeout(() => {
                        try {
                          const cursor = instance.getElement()?.querySelector('.ti-cursor');
                          if (cursor) {
                            cursor.style.display = 'none';
                          }
                        } catch (e) {
                          console.warn('Error hiding cursor:', e);
                        }
                      }, 500);
                    } catch (e) {
                      console.warn('Error in afterComplete:', e);
                    }
                    return instance;
                  }
                }}
                getBeforeInit={(instance) => {
                  instance
                    .type("C:/")
                    .pause(750)
                    .delete(2)
                    .pause(500)
                    .type("onsole");
                  
                  return instance;
                }}
              />
            </div>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            items={[
              { title: 'Home' },
              { title: 'Dashboard' },
              { title: 'Overview' }
            ]}
            style={{ margin: '16px 0' }}
          />
          <Content
            className="content-container"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <h1 className="text-2xl font-bold mb-5">Welcome to Grab Console!</h1>
            <p className="mb-3">This layout follows the Ant Design header-sidebar structure.</p>
            
            <Divider orientation="left">TypeIt Library Tests</Divider>
            
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Card title="Basic TypeIt Examples" variant="outlined" key={`basic-${resetKey}`}>
                <div>
                  <h4>Simple String:</h4>
                  <div className="animation-container">
                    <SafeTypeIt
                      key={`simple-${resetKey}`}
                      options={{
                        cursor: true,
                        speed: 50
                      }}
                    >
                      This is a simple TypeIt example!
                    </SafeTypeIt>
                  </div>
                  
                  <h4>With Chain Methods:</h4>
                  <div className="animation-container">
                    <SafeTypeIt
                      key={`chain-${resetKey}`}
                      options={{
                        cursor: true,
                        speed: 50
                      }}
                      getBeforeInit={(instance) => {
                        instance
                          .type("Hello")
                          .pause(500)
                          .type(" World!")
                          .pause(500)
                          .delete(6)
                          .pause(500)
                          .type(" TypeIt!");
                        
                        return instance;
                      }}
                    />
                  </div>
                  
                  <h4>Console Example:</h4>
                  <div className="console-example">
                    $ <SafeTypeIt
                      key={`console-${resetKey}`}
                      options={{
                        cursor: true,
                        speed: 50
                      }}
                      getBeforeInit={(instance) => {
                        instance
                          .type("C:/")
                          .pause(750)
                          .delete(2)
                          .pause(500)
                          .type("onsole");
                        
                        return instance;
                      }}
                    />
                  </div>
                </div>
              </Card>
              
              <Card title="Your Example from Original Request" variant="outlined">
                <div className="animation-container">
                  <SafeTypeIt
                    key={`alex-${resetKey}`}
                    options={{
                      cursor: true,
                      speed: 50
                    }}
                    getBeforeInit={(instance) => {
                      instance
                        .type("Hi, I'm Alxe")
                        .pause(750)
                        .delete(2)
                        .pause(500)
                        .type("ex!");
                        
                      return instance;
                    }}
                  />
                </div>
              </Card>
            </Space>
            
            <Button 
              type="default" 
              htmlType="button"
              icon={<ReloadOutlined />} 
              onClick={resetAnimation}
              className="mt-5"
            >
              Restart All Animations
            </Button>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
