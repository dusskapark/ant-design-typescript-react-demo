import React, { useEffect } from "react";
import { Menu, Layout } from "antd";
import { HomeOutlined, SwapOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import TypeIt from "typeit-react";
import ErrorBoundary from "./ErrorBoundary";

const { Header } = Layout;

// Top navigation menu items
const items: MenuProps["items"] = [
  {
    key: "home",
    label: "Home",
    icon: <HomeOutlined />,
  },
  {
    key: "auth",
    label: "Auth Demo",
    icon: <SwapOutlined />,
  },
];

// Safe TypeIt wrapper component
const SafeTypeIt: React.FC<any> = (props) => {
  return (
    <ErrorBoundary>
      <TypeIt {...props} />
    </ErrorBoundary>
  );
};

interface AppHeaderProps {
  resetKey?: number;
}

const AppHeader: React.FC<AppHeaderProps> = ({ resetKey = 0 }) => {
  const navigate = useNavigate();

  // Log when resetKey changes (for debugging)
  useEffect(() => {
    console.log('AppHeader received new resetKey:', resetKey);
  }, [resetKey]);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "home":
        navigate("/");
        break;
      case "auth":
        navigate("/auth");
        break;
    }
  };

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div className="logo-container">
        <span className="my-logo">My</span>
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
                  try {
                    setTimeout(() => {
                      try {
                        const cursor = instance
                          .getElement()
                          ?.querySelector(".ti-cursor");
                        if (cursor) {
                          cursor.style.display = "none";
                        }
                      } catch (e) {
                        console.warn("Error hiding cursor:", e);
                      }
                    }, 500);
                  } catch (e) {
                    console.warn("Error in afterComplete:", e);
                  }
                  return instance;
                },
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
        defaultSelectedKeys={["home"]}
        items={items}
        onClick={handleMenuClick}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

export default AppHeader; 