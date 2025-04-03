import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

export interface LottiePlayerProps {
  /** Animation source JSON */
  src: any;
  /** Width of the animation player (default: 100%) */
  width?: number | string;
  /** Height of the animation player (default: 220px) */
  height?: number | string;
  /** Whether to loop the animation (default: true) */
  loop?: boolean;
  /** Whether to autoplay the animation (default: true) */
  autoplay?: boolean;
  /** Optional className for custom styling */
  className?: string;
}

/**
 * LottiePlayer component for rendering Lottie animations
 * 
 * @example
 * ```tsx
 * import { LottiePlayer, SuccessAnimation } from './components/animations';
 * 
 * // Basic usage
 * <LottiePlayer src={SuccessAnimation} />
 * 
 * // Custom size
 * <LottiePlayer src={SuccessAnimation} width="592px" height="220px" />
 * 
 * // Control playback
 * <LottiePlayer src={SuccessAnimation} loop={false} autoplay={false} />
 * ```
 */
export const LottiePlayer: React.FC<LottiePlayerProps> = ({
  width = '100%',
  height = '220px',
  loop = true,
  autoplay = true,
  className,
  src,
}) => {
  return (
    <Player
      autoplay={autoplay}
      loop={loop}
      src={src}
      style={{ height, width }}
      className={className}
    />
  );
}; 