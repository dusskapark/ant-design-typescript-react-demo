import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import TypeItPage from "./pages/TypeItPage";
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
