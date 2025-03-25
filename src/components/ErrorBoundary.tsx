import React, { Component, ErrorInfo } from "react";
import { Alert } from "antd";

class ErrorBoundary extends Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
  }) {
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
      return (
        this.props.fallback || (
          <Alert
            message="Component Error"
            description="There was an error rendering this component."
            type="error"
            showIcon
          />
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 