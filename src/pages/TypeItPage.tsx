import React, { useState, useEffect } from "react";
import { Button, Card, Space, Tabs } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import TypeIt from "typeit-react";
import ErrorBoundary from "../components/ErrorBoundary";
import { MarkdownContent } from "../utils/markdown";
import readmeContent from "./TypeItPage.md?raw";

// Safe TypeIt component
const SafeTypeIt: React.FC<any> = (props) => {
  return (
    <ErrorBoundary>
      <TypeIt {...props} />
    </ErrorBoundary>
  );
};

interface TypeItPageProps {
  resetKey?: number;
  resetAnimation?: () => void;
}

const TypeItPage: React.FC<TypeItPageProps> = ({ resetKey: externalResetKey, resetAnimation: externalResetAnimation }) => {
  // Local state for animation reset
  const [localResetKey, setLocalResetKey] = useState(0);
  
  // Use either the external or local reset key
  const resetKey = externalResetKey !== undefined ? externalResetKey : localResetKey;
  
  // Local reset function
  const handleResetAnimation = () => {
    if (externalResetAnimation) {
      externalResetAnimation();
    } else {
      setLocalResetKey(prev => prev + 1);
    }
  };
  
  // Log when component receives props (for debugging)
  useEffect(() => {
    console.log('TypeItPage received props:', { externalResetKey, externalResetAnimation });
  }, [externalResetKey, externalResetAnimation]);

  // Tab items
  const tabItems = [
    {
      key: 'examples',
      label: 'Examples',
      children: (
        <>
          <Button
            type="default"
            htmlType="button"
            icon={<ReloadOutlined />}
            onClick={handleResetAnimation}
            className="mt-5 mb-5"
          >
            Restart All Animations
          </Button>

          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Card title="Basic TypeIt Examples">
              <div>
                <h4>Simple String:</h4>
                <div className="animation-container">
                  <SafeTypeIt
                    key={`simple-${resetKey}`}
                    options={{
                      cursor: true,
                      speed: 50,
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
                      speed: 50,
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
                  ${" "}
                  <SafeTypeIt
                    key={`console-${resetKey}`}
                    options={{
                      cursor: true,
                      speed: 50,
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

            <Card title="App Logo Example">
              <div className="animation-container" style={{ backgroundColor: "#004d40", padding: "20px", borderRadius: "8px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ 
                    fontFamily: "'Inter', sans-serif", 
                    fontWeight: 800, 
                    fontSize: "18px", 
                    color: "white" 
                  }}>My</span>
                  <div style={{ 
                    backgroundColor: "white", 
                    borderRadius: "4px", 
                    padding: "2px 6px", 
                    marginLeft: "4px", 
                    display: "flex", 
                    alignItems: "center", 
                    height: "24px" 
                  }}>
                    <div style={{ 
                      fontFamily: "'Inter', sans-serif", 
                      fontWeight: 500, 
                      fontSize: "16px", 
                      color: "#000", 
                      lineHeight: 1 
                    }}>
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
              </div>
            </Card>

            <Card title="Figma MCP Magic Demo" className="mt-4">
              <div className="text-center">
                <p className="mb-4 text-gray-600">
                  Experience a fullscreen typewriter animation showcasing Figma MCP magic tricks discovery.
                </p>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => window.open('/figma-mcp-magic', '_blank')}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 border-0 text-white font-semibold px-8 py-2 h-auto"
                  style={{ minHeight: '48px' }}
                >
                  🎬 Launch Figma MCP Magic Demo
                </Button>
                <p className="mt-2 text-xs text-gray-400">
                  Press ESC to exit fullscreen mode
                </p>
              </div>
            </Card>
          </Space>
        </>
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
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">TypeIt Animation Examples</h1>
      
      <Tabs defaultActiveKey="examples" items={tabItems} />
    </div>
  );
};

export default TypeItPage; 