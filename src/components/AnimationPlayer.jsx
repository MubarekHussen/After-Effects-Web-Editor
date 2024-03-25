import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import ExportButton from './ExportButton';

const AnimationPlayer = ({ animationData }) => {
  const container = useRef();
  const animation = useRef();

  useEffect(() => {
    console.log('Received animationData:', animationData);

    if (animationData) {
      if (animation.current) {
        animation.current.destroy();
      }
      animation.current = lottie.loadAnimation({
        container: container.current,
        renderer: 'canvas',
        loop: true,
        autoplay: true,
        animationData: animationData
      });
    }

    return () => {
      if (animation.current) {
        animation.current.destroy();
      }
    };
  }, [animationData]);

  return (
    <div className="p-6 mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space-x-4">
      <div ref={container} className="w-full h-96" />
      <ExportButton animationData={animationData} />
    </div>
  );
};

export default AnimationPlayer;