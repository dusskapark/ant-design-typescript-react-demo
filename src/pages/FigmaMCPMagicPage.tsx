import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { CloseOutlined, ReloadOutlined } from "@ant-design/icons";
import TypeIt from "typeit-react";
import { useNavigate } from "react-router-dom";

const FigmaMCPMagicPage: React.FC = () => {
  const [resetKey, setResetKey] = useState(0);
  const navigate = useNavigate();

  // ESC 키로 페이지 종료
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        navigate('/');
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [navigate]);

  // 애니메이션 재시작
  const handleRestart = () => {
    setResetKey(prev => prev + 1);
  };

  // 페이지 종료
  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* 제어 버튼들 */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          type="text"
          icon={<ReloadOutlined />}
          onClick={handleRestart}
          className="text-white bg-black bg-opacity-50 border-gray-600 hover:bg-gray-800"
          title="Restart Animation"
        />
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={handleClose}
          className="text-white bg-black bg-opacity-50 border-gray-600 hover:bg-gray-800"
          title="Close (ESC)"
        />
      </div>

      {/* 메인 애니메이션 컨테이너 */}
      <div className="text-center max-w-4xl mx-auto px-8">
        <div className="space-y-8">
          {/* 1단계: One more thing... */}
          <div className="user-text">
            <TypeIt
              key={`step1-${resetKey}`}
              options={{
                cursor: true,
                cursorChar: "_",
                speed: 80,
                startDelay: 500,
              }}
              getBeforeInit={(instance) => {
                instance.type("One more thing...");
                return instance;
              }}
            />
          </div>

          {/* 2단계: Search @web question */}
          <div className="user-text">
            <TypeIt
              key={`step2-${resetKey}`}
              options={{
                cursor: true,
                cursorChar: "_",
                speed: 70,
                startDelay: 3000,
              }}
              getBeforeInit={(instance) => {
                instance.type("Search @web to discover Figma MCP magic tricks?");
                return instance;
              }}
            />
          </div>

          {/* 3단계: Running... */}
          <div className="loading-text">
            <TypeIt
              key={`step3-${resetKey}`}
              options={{
                cursor: true,
                cursorChar: "_",
                speed: 100,
                startDelay: 6500,
              }}
              getBeforeInit={(instance) => {
                instance
                  .type("Running")
                  .pause(300)
                  .type(".")
                  .pause(300)
                  .type(".")
                  .pause(300)
                  .type(".");
                return instance;
              }}
            />
          </div>

          {/* 4단계: AI Response */}
          <div className="ai-response">
            <TypeIt
              key={`step4-${resetKey}`}
              options={{
                cursor: true,
                cursorChar: "_",
                speed: 60,
                startDelay: 10000,
                afterComplete: (instance) => {
                  // 애니메이션 완료 후 커서 숨기기
                  setTimeout(() => {
                    const cursor = instance.getElement()?.querySelector(".ti-cursor");
                    if (cursor) {
                      cursor.style.display = "none";
                    }
                  }, 2000);
                  return instance;
                },
              }}
              getBeforeInit={(instance) => {
                instance.type("Found a community site with Figma MCP magic tricks. Let me create a QR code for you...");
                return instance;
              }}
            />
          </div>
        </div>

        {/* ESC 힌트 */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm">
          Press ESC to exit
        </div>
      </div>

      <style>{`
        .user-text {
          color: #ffffff;
          font-size: 48px;
          font-family: 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
          font-weight: 400;
          line-height: 1.4;
          min-height: 80px;
        }

        .ai-response {
          color: #00d4aa;
          font-size: 38px;
          font-family: 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
          font-weight: 300;
          font-style: italic;
          line-height: 1.4;
          opacity: 0.9;
          min-height: 80px;
        }

        .loading-text {
          color: #ffd700;
          font-size: 36px;
          font-family: 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
          font-weight: 300;
          font-style: italic;
          min-height: 60px;
        }

        /* 반응형 */
        @media (max-width: 1023px) {
          .user-text {
            font-size: 36px;
            min-height: 60px;
          }
          .ai-response {
            font-size: 28px;
            min-height: 60px;
          }
          .loading-text {
            font-size: 24px;
            min-height: 40px;
          }
        }

        @media (max-width: 768px) {
          .user-text {
            font-size: 24px;
            min-height: 40px;
          }
          .ai-response {
            font-size: 20px;
            min-height: 40px;
          }
          .loading-text {
            font-size: 18px;
            min-height: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default FigmaMCPMagicPage; 