# AuthTransitionPage Component

## Design Overview
This component demonstrates an intuitive authentication flow with visual feedback for users. It was designed as a sample to showcase how a well-crafted authentication experience should look and function.

## Design Goals
- Replace generic loading spinners with an engaging visual journey
- Communicate progress clearly to reduce perceived wait time
- Provide appropriate feedback for both success and error states
- Maintain consistent design language with Ant Design system

## User Experience Flow

1. **Preparation Stage**
   - User sees the motorcycle preparing for "delivery" (authentication)
   - Simple message explains the system is getting ready

2. **Processing Stage**
   - Animated motorcycle shows authentication in progress
   - Progress indicator gives sense of time remaining

3. **Completion Stage**
   - Success: Clear success animation with redirect option
   - Error: Appropriate error visualization with retry option


### Key Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| titleOption | number | 0 | Selects from predefined title variations, allowing for different messaging contexts. |
| contentOption | number | 0 | Controls the descriptive text displayed during each authentication stage. |
| estimatedTime | number | 10 | Defines the expected authentication duration in seconds. Drives animation speed and determines when to show refresh notice. |
| showError | boolean | false | When true, displays the error state instead of the success flow. |
| errorType | string | "BAD_REQUEST" | Determines which error messaging to display. Supports standard HTTP error codes. |
| onRetry | function | undefined | Callback function that executes when the user clicks the retry button in error states. |
| redirectUrl | string | "#" | The destination URL for both automatic redirection and the manual redirect button. |
| showRefreshNotice | boolean | undefined | Controls whether to display a refresh notice when authentication takes longer than estimated. |
| customErrorTitle | string | undefined | Optional parameter to override the default error title. |
| customErrorMessage | string | undefined | Optional parameter to override the default error message. |

### Supported HTTP Error Types

| Error Type | Code | Title | Message |
|------------|------|-------|---------|
| BAD_REQUEST | 400 | Invalid Request | The server cannot process the request due to a client error. |
| UNAUTHORIZED | 401 | Authentication Required | Access is denied due to invalid credentials. |
| FORBIDDEN | 403 | Access Denied | You don't have permission to access this resource. |
| NOT_FOUND | 404 | Resource Not Found | The requested resource could not be found on the server. |
| TIMEOUT | 408 | Request Timeout | The server timed out waiting for the request to complete. |
| CONFLICT | 409 | Request Conflict | The request could not be completed due to a conflict with the resource. |
| SERVER_ERROR | 500 | Server Error | An unexpected error occurred on the server. Please try again later. |

## Technical Information

### State Management
- Tracks countdown timer, progress percentage, animation completion
- Manages error content display and refresh notice visibility

### Dependencies
- React
- Ant Design (Typography, Button, Alert, Steps, etc.)
- LottieFiles Player (@lottiefiles/react-lottie-player)
- Animation JSON files (located in the assets/animation directory)
  - Required files: motorcycle.json, success.json, error.json, timeout.json

## Additional Usage Examples

```tsx
// Error scenario (401 unauthorized)
<AuthTransitionPage
  titleOption={0}
  showError={true}
  errorType="UNAUTHORIZED"
  onRetry={() => handleRetry()}
  showRefreshNotice={true}
/>

// Custom error messaging
<AuthTransitionPage
  titleOption={0}
  showError={true}
  errorType="SERVER_ERROR"
  customErrorTitle="System Temporarily Unavailable"
  customErrorMessage="We're experiencing technical difficulties. Please try again in a few minutes."
  onRetry={() => handleRetry()}
/>

// With refresh notice for long-running authentication
<AuthTransitionPage
  titleOption={0}
  estimatedTime={30}
  redirectUrl="/dashboard"
  showRefreshNotice={true}
/>
```

## Important Notes
- This component only handles visual representation of the authentication process
- The actual authentication logic must be implemented separately
- For best performance, consider preloading animation files in production environments
