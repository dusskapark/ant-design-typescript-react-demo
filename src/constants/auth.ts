/**
 * Authentication-related constants
 */

// Error types with HTTP status codes
export const ERROR_TYPES = {
  BAD_REQUEST: {
    code: "400 Bad Request",
    title: "Invalid Request",
    message: "The server cannot process the request due to a client error."
  },
  UNAUTHORIZED: {
    code: "401 Unauthorized",
    title: "Authentication Required",
    message: "Access is denied due to invalid credentials."
  },
  FORBIDDEN: {
    code: "403 Forbidden",
    title: "Access Denied",
    message: "You don't have permission to access this resource."
  },
  NOT_FOUND: {
    code: "404 Not Found",
    title: "Resource Not Found",
    message: "The requested resource could not be found on the server."
  },
  TIMEOUT: {
    code: "408 Request Timeout",
    title: "Request Timeout",
    message: "The server timed out waiting for the request to complete."
  }
};

// Authentication progress title options
export const TITLE_OPTIONS = [
  "Authentication in Progress...",
  "Establishing Secure Connection...",
  "Connecting Services...",
  "Syncing Authentication...",
  "Validating Credentials..."
];

// Content text for each step of the authentication process
export const STEP_CONTENT = [
  "Preparing your authentication request. This won't take long.",
  "Your authentication is on the way.\nPlease wait while we process your credentials.",
  "Authentication delivered successfully! You'll be redirected shortly.\nIf you are not redirected automatically, please click the button below."
];

// Step titles
export const STEP_TITLES = {
  PREPARING: "Preparing",
  ON_THE_WAY: "On the way",
  DELIVERED: "Delivered",
};

// Default estimated time for authentication (in seconds)
export const DEFAULT_ESTIMATED_TIME = 10;

// Type definitions
export type ErrorType = keyof typeof ERROR_TYPES;
export type StepStatus = "wait" | "process" | "finish" | "error"; 