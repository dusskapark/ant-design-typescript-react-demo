import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import TypeItPage from "./pages/TypeItPage";
import LoginSuccessPage from "./pages/LoginSuccessPage";
import LoginPageContainer from "./pages/LoginPageContainer";
import FigmaMCPMagicPage from "./pages/FigmaMCPMagicPage";
import MainLayout from "./components/MainLayout";
import "./style/index.less";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <MainLayout 
              breadcrumbItems={[{ title: "Home" }, { title: "TypeIt" }]}
              defaultOpenKeys={["sub1"]}
            >
              <TypeItPage />
            </MainLayout>
          } 
        />
        <Route 
          path="/auth" 
          element={
            <MainLayout 
              breadcrumbItems={[{ title: "Auth" }, { title: "Auth Transition" }]}
              defaultOpenKeys={["sub2"]}
            >
              <AuthPage />
            </MainLayout>
          } 
        />
        <Route 
          path="/demo" 
          element={
            <MainLayout 
              breadcrumbItems={[{ title: "Demo" }, { title: "Main Page" }]}
              defaultOpenKeys={["sub2"]}
            >
              <MainPage />
            </MainLayout>
          } 
        />
        <Route path="/login" element={<LoginPageContainer />} />
        <Route path="/login-success" element={<LoginSuccessPage />} />
        <Route path="/figma-mcp-magic" element={<FigmaMCPMagicPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
