# Ant Design TypeScript React Demo

This project demonstrates the usage of Ant Design with React and TypeScript, showcasing various UI components and interactions.

## Features

- **Authentication Transition Page**: Visual representation of authentication process
- **Main Page**: Demonstration of basic layout and components
- **TypeIt Page**: Text animation example

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Proposed Refactoring

### 1. Component Structure Improvements

#### AuthTransitionPage Component
- **Current Issue**: The AuthTransitionPage component (454 lines) is too large and handles too many responsibilities.
- **Proposed Solution**: Break down into smaller, focused components:
  - `AnimationPlayer`: Manage different animation types (success, error, timeout, motorcycle)
  - `StepsProgress`: Encapsulate the Steps component logic
  - `ErrorDisplay`: Handle error states and messages
  - `SuccessDisplay`: Handle success state and redirection
  - `BottomSheet`: Manage the bottom sheet container

#### Shared Constants
- **Current Issue**: ERROR_TYPES and TITLE_OPTIONS are duplicated in both AuthPage and AuthTransitionPage.
- **Proposed Solution**: Move these to a shared constants file (e.g., `src/constants/auth.ts`).

### 2. State Management

- **Current Issue**: Complex state handling with multiple useState and useEffect hooks.
- **Proposed Solution**: Implement useReducer for better state management or consider using a small state management library like Zustand or Jotai.

### 3. Styling Enhancements

- **Current Issue**: Some hardcoded pixel values and !important CSS rules.
- **Proposed Solution**: 
  - Use more responsive units (rem, vh/vw) 
  - Remove !important where possible and restructure CSS
  - Consider using CSS-in-JS with a library like styled-components

### 4. Props Cleanup

- **Current Issue**: Some unused props (contentOption) and complex prop naming (showRefreshNotice: externalShowRefreshNotice).
- **Proposed Solution**: 
  - Remove unused props
  - Simplify prop naming and destructuring
  - Consider using React.Context for deeply nested prop values

### 5. Performance Optimization

- **Current Issue**: Multiple interval timers and possibly redundant re-renders.
- **Proposed Solution**:
  - Use `useCallback` and `useMemo` for functions and values
  - Consider using React.memo for subcomponents
  - Optimize animation handling to reduce CPU usage

### 6. Accessibility Improvements

- **Current Issue**: Potential accessibility issues in the UI.
- **Proposed Solution**:
  - Add appropriate ARIA attributes
  - Ensure proper keyboard navigation
  - Improve color contrast for error states

### 7. Testing

- **Current Issue**: No apparent test files.
- **Proposed Solution**: Add unit and integration tests using React Testing Library.

### 8. TypeScript Enhancements

- **Current Issue**: Some type assertions and non-type-safe areas.
- **Proposed Solution**:
  - Replace `as const` type assertions with proper typing
  - Use more specific types and avoid 'any'
  - Add better TypeScript documentation

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Tech Stack

- React
- TypeScript
- Ant Design
- Vite
- Tailwind CSS

## Project Structure

```
/src
  /components      # Reusable components
  /pages           # Page components
  /hooks           # Custom hooks
  /utils           # Utility functions
  /assets          # Static assets like images, fonts
  /types           # TypeScript type definitions
```

## Authors

- [@lchenrique](https://github.com/lchenrique)

