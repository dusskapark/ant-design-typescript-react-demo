import React from "react";
import { LottiePlayer } from "../animations";
import {
  MotorcycleAnimation,
  SuccessAnimation,
  ErrorAnimation,
  TimeoutAnimation
} from "../animations";
import "../../style/components.less";

export type AnimationType = "motorcycle" | "success" | "error" | "timeout";

interface AnimationPlayerProps {
  type: AnimationType;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

/**
 * AnimationPlayer component
 * Renders different animations based on the type prop
 */
const AnimationPlayer: React.FC<AnimationPlayerProps> = ({
  type,
  loop = true,
  autoplay = true,
  className = "animation-player"
}) => {
  // Select animation source based on type
  const getAnimationSource = () => {
    switch (type) {
      case "motorcycle":
        return MotorcycleAnimation;
      case "success":
        return SuccessAnimation;
      case "error":
        return ErrorAnimation;
      case "timeout":
        return TimeoutAnimation;
      default:
        return MotorcycleAnimation;
    }
  };

  return (
    <div className="animation-container-auth">
      <LottiePlayer
        autoplay={autoplay}
        loop={loop}
        src={getAnimationSource()}
        className={className}
      />
    </div>
  );
};

export default AnimationPlayer; 