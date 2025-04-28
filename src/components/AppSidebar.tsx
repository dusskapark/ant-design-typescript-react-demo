import React from "react";
import { Menu, Layout, theme } from "antd";
import { HomeOutlined, SwapOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

// Side menu items
const items: MenuProps["items"] = [
  {
    key: "sub1",
    icon: <HomeOutlined />,
    label: "Home",
    children: [
      { key: "typeit", label: "TypeIt" },
      { key: "login", label: "Login Page" },
    ],
  },
  {
    key: "sub2",
    icon: <SwapOutlined />,
    label: "Auth",
    children: [
      { key: "auth-transition", label: "Auth Transition" },
    ],
  },
];

interface AppSidebarProps {
  defaultOpenKeys?: string[];
}

const AppSidebar: React.FC<AppSidebarProps> = ({ defaultOpenKeys = ["sub1"] }) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the selected key based on current route
  const getSelectedKey = () => {
    if (location.pathname === "/") return "typeit";
    if (location.pathname === "/auth") return "auth-transition";
    if (location.pathname === "/demo") return "auth-transition";
    return "typeit";
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "typeit":
        navigate("/");
        break;
      case "auth-transition":
        navigate("/auth?mode=settings");
        break;
      case "login":
        navigate("/login");
        break;
    }
  };

  return (
    <Sider width={200} style={{ background: token.colorBgContainer }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={[getSelectedKey()]}
        defaultOpenKeys={defaultOpenKeys}
        style={{ height: "100%", borderRight: 0 }}
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default AppSidebar; 