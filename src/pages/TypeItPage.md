# TypeIt Animation Examples

## Overview

TypeIt is a versatile JavaScript animation library that allows you to create and control typewriter animations. This page demonstrates various examples of TypeIt used in a React application.

## Features

- **Simple Typing Animation**: Basic typing animation with default settings.
- **Chained Method Animations**: Advanced animations using TypeIt's chain methods for typing, pausing, and deleting text.
- **Console-Style Animations**: Emulate a command-line interface typing experience.
- **App Logo Integration**: See how TypeIt can be integrated into a UI component like a logo.

## Usage Examples

### Basic Usage

```jsx
<TypeIt>
  This is a simple TypeIt example!
</TypeIt>
```

### With Chain Methods

```jsx
<TypeIt
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
```

### Advanced Options

TypeIt supports many configuration options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| speed | number | 100 | The typing speed in milliseconds |
| cursor | boolean | true | Whether to show the cursor |
| cursorChar | string | "\|" | Character to use as the cursor |
| cursorSpeed | number | 1000 | The blinking speed of the cursor |
| lifeLike | boolean | true | Whether the typing should have human-like randomness |
| startDelay | number | 0 | Delay before the animation begins |

## Error Handling

TypeIt animations are wrapped in an ErrorBoundary to prevent animation errors from crashing the entire application.

## Notes

- You can restart all animations using the "Restart All Animations" button.
- The animations are controlled by a shared `resetKey` state that increments on reset.
- When an animation completes, you can hide the cursor for a cleaner display. 