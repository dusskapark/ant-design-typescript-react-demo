# AuthTransitionPage Component

## Overview
`AuthTransitionPage` is a React component that provides visual feedback to users during authentication processes. It displays each stage of the authentication flow (preparing, in progress, completed) with animations, clearly communicating success or error states to improve user experience.

## Purpose
- Provides real-time visual feedback during authentication processes
- Reduces perceived waiting time through engaging animations and progress indicators
- Delivers clear error messages and retry options when authentication fails
- Guides users to next steps after successful authentication

## Key Features
- Stage-based animations (loading, in-progress, success/error)
- Visual progress tracking (Steps component)
- Error state handling with appropriate messaging
- Manual redirection button (after successful authentication)
- Timeout detection and notification
- Retry option (when errors occur)

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `titleOption` | number | 0 | Index of title option to display (0-4) |
| `contentOption` | number | 0 | Index of content option to display |
| `estimatedTime` | number | 10 | Estimated time in seconds for authentication completion |
| `showError` | boolean | false | Whether to display error state |
| `errorType` | string | "BAD_REQUEST" | Type of error (based on HTTP status codes) |
| `onRetry` | function | undefined | Function to call when retry button is clicked |
| `redirectUrl` | string | "#" | URL to redirect after successful authentication |
| `showRefreshNotice` | boolean | undefined | Whether to show refresh notice if taking longer than expected |

## State Management
- `countdown`: Tracks countdown timer for authentication completion
- `currentProgress`: Calculates overall progress (0-100%)
- `isSuccessAnimationComplete`: Tracks when success animation has finished
- `showErrorContent`: Controls display of error content
- `percent`: Tracks progress percentage for current step

## Supported HTTP Error Types

| Error Type | Code | Title | Message |
|------------|------|-------|---------|
| BAD_REQUEST | 400 Bad Request | Invalid Request | The server cannot process the request due to a client error. |
| UNAUTHORIZED | 401 Unauthorized | Authentication Required | Access is denied due to invalid credentials. |
| FORBIDDEN | 403 Forbidden | Access Denied | You don't have permission to access this resource. |
| NOT_FOUND | 404 Not Found | Resource Not Found | The requested resource could not be found on the server. |
| TIMEOUT | 408 Request Timeout | Request Timeout | The server timed out waiting for the request to complete. |

## Authentication Process Stages

1. **Preparing**
   - Animation: Motorcycle preparing for delivery
   - Status: Preparing authentication request
   - Message: "Preparing your authentication request. This won't take long."

2. **On the way**
   - Animation: Motorcycle in motion
   - Status: Processing authentication request
   - Message: "Your authentication is on the way. Please wait while we process your credentials."
   - Progress indicator: Automatically increases from 0-100%

3. **Delivered**
   - Success scenario:
     - Animation: Success animation
     - Message: "Authentication delivered successfully! You'll be redirected shortly. If you are not redirected automatically, please click the button below."
     - Manual redirection button displayed

   - Error scenario:
     - Animation: Error animation (generic error or special timeout animation)
     - Error code, title, and message displayed
     - Retry button displayed

## State Transition Logic

1. **Success Scenario**:
   - Preparing → On the way → Delivered (success)
   - Progress indicator at each stage
   - Automatic or manual redirection after completion

2. **Error Scenario**:
   - Preparing (displayed for 2 seconds) → On the way (where error occurs)
   - Progress stops and error animation/message is displayed
   - Retry button available to restart the process

3. **Delay Handling**:
   - If authentication exceeds `estimatedTime`
   - "Still Waiting?" notification is shown when `showRefreshNotice` is active
   - Refresh option provided to users

## Styling
- Class-based styling (defined in `components.less` file)
- Styled animation containers, progress indicators, buttons
- Responsive layout and animation effects
- Bottom sheet design for mobile-friendly UI

## Usage Examples

```tsx
// Basic success scenario
<AuthTransitionPage
  titleOption={0}
  estimatedTime={10}
  redirectUrl="/dashboard"
/>

// Error scenario (401 unauthorized)
<AuthTransitionPage
  titleOption={0}
  showError={true}
  errorType="UNAUTHORIZED"
  onRetry={() => handleRetry()}
  showRefreshNotice={true}
/>
```

## Important Notes

- This component only handles visual representation of the authentication process. The actual authentication logic must be implemented separately.
- Error handling and retry logic must be provided externally through the `onRetry` prop.
- Animation assets (JSON files) are required: motorcycle.json, success.json, error.json, timeout.json

## Dependencies

- React
- Ant Design (Typography, Button, Alert, Steps, etc.)
- LottieFiles Player (@lottiefiles/react-lottie-player)
- Animation JSON files

## Special Handling

- Timeout errors: Uses special animation distinct from regular errors
- Delayed responses: Refresh notice displayed (optional)
- Manual redirection option provided after success animation completes 