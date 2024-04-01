import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fabric } from 'fabric';
import lottie from 'lottie-web';

const Lottie = ({ animationData, animationProperties }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const fabricObjectRef = useRef(null);
  const fixedWidth = 600;
  const fixedHeight = 600;

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: fixedWidth,
      height: fixedHeight,
      backgroundColor: 'transparent',
    });

    fabricCanvasRef.current = fabricCanvas;

    const tmpCanvasEl = fabric.util.createCanvasElement();
    tmpCanvasEl.width = fixedWidth;
    tmpCanvasEl.height = fixedHeight;

    const lottieItem = lottie.loadAnimation({
      renderer: 'canvas',
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        context: tmpCanvasEl.getContext('2d'),
        preserveAspectRatio: 'xMidYMid meet',
      },
    });

    lottieItem.addEventListener('enterFrame', () => {
      fabricCanvasRef.current.requestRenderAll();
    });

    fabricObjectRef.current = new fabric.Image(tmpCanvasEl, {
      width: fixedWidth,
      height: fixedHeight,
      selectable: true,
      centeredScaling: true,
      hasControls: true,
      hasRotatingPoint: true,
    });

    fabricCanvas.add(fabricObjectRef.current);

    return () => {
      fabricCanvas.dispose();
    };
  }, [animationData]);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.setDimensions({ width: fixedWidth, height: fixedHeight });
      fabricObjectRef.current.set({
        width: fixedWidth,
        height: fixedHeight,
      });
      fabricCanvasRef.current.renderAll();
    }
  }, []);

  useEffect(() => {
    if (fabricObjectRef.current && animationProperties) {
      const { position, scale, angle, opacity } = animationProperties;
      fabricObjectRef.current.set({
        left: position.x,
        top: position.y,
        scaleX: scale.x,
        scaleY: scale.y,
        angle: angle,
        opacity: opacity,
      });
      fabricCanvasRef.current.requestRenderAll();
    }
  }, [animationProperties]);

  return (
    <div className="flex justify-center items-center">
      <canvas ref={canvasRef} width={fixedWidth} height={fixedHeight} />
    </div>
  );
};

Lottie.propTypes = {
  animationData: PropTypes.object.isRequired,
  animationProperties: PropTypes.shape({
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    scale: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    angle: PropTypes.number,
    opacity: PropTypes.number,
  }),
};

export default Lottie;