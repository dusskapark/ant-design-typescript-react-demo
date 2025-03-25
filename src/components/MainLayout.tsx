import React, { useState } from "react";
import { Layout, theme, Breadcrumb } from "antd";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import { useLocation } from "react-router-dom";

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
  breadcrumbItems: { title: string }[];
  defaultOpenKeys?: string[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  breadcrumbItems, 
  defaultOpenKeys 
}) => {
  const { token } = theme.useToken();
  const [resetKey, setResetKey] = useState(0);
  const location = useLocation();
  
  // Check if we're in Auth Preview mode
  const isAuthPreviewMode = location.pathname === "/auth" && location.search.includes("mode=preview");
  
  // Public method to reset animations
  const resetAnimation = () => {
    console.log('MainLayout.resetAnimation called');
    setResetKey((prev) => prev + 1);
  };

  // Prepare the props to pass to children
  const childProps = {
    resetKey,
    resetAnimation
  };

  // Create a child with props
  const renderChildrenWithProps = () => {
    return React.Children.map(children, child => {
      // Check if the child is a valid React element
      if (React.isValidElement(child)) {
        console.log('Cloning child with props:', childProps);
        // Clone the element to pass props
        return React.cloneElement(child, childProps);
      }
      return child;
    });
  };

  // For auth preview mode, we render only the children (no layout)
  if (isAuthPreviewMode) {
    return <>{renderChildrenWithProps()}</>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader resetKey={resetKey} />
      <Layout>
        <AppSidebar defaultOpenKeys={defaultOpenKeys} />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            items={breadcrumbItems}
            style={{ margin: "16px 0" }}
          />
          <Content
            className="content-container"
            style={{
              background: token.colorBgContainer,
              borderRadius: token.borderRadiusLG,
              padding: 24,
              position: "relative",
              overflow: "auto"
            }}
          >
            {renderChildrenWithProps()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 