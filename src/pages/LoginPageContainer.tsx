import React from 'react';
import { useSearchParams } from 'react-router-dom';
import LoginSettingsPage from './LoginSettingsPage';
import LoginDisplayPage from './LoginDisplayPage'; // Assuming LoginPage was renamed
import MainLayout from '../components/MainLayout';

const LoginPageContainer: React.FC = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  if (mode === 'display') {
    // Render the actual login UI without MainLayout
    return <LoginDisplayPage />;
  } else {
    // Render the settings page within MainLayout
    // Note: Adjust breadcrumb and keys as needed for your layout
    return (
      <MainLayout
        breadcrumbItems={[{ title: "Home" }, { title: "Login Settings" }]} 
        defaultOpenKeys={["sub1"]} // Match the sidebar key for Login
      >
        <LoginSettingsPage />
      </MainLayout>
    );
  }
};

export default LoginPageContainer; 