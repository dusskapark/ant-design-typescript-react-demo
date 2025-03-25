import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import motorcycleAnimation from "../../assets/animation/motorcycle.json";
import successAnimation from "../../assets/animation/success.json";
import errorAnimation from "../../assets/animation/error.json";
import timeoutAnimation from "../../assets/animation/timeout.json";
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
        return motorcycleAnimation;
      case "success":
        return successAnimation;
      case "error":
        return errorAnimation;
      case "timeout":
        return timeoutAnimation;
      default:
        return motorcycleAnimation;
    }
  };

  return (
    <div className="animation-container-auth">
      <Player
        autoplay={autoplay}
        loop={loop}
        src={getAnimationSource()}
        className={className}
      />
    </div>
  );
};

export default AnimationPlayer; 