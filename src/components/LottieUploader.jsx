import React, { useState, useEffect, useRef } from 'react';
import Lottie from './Lottie';
import AnimationEditor from './AnimationEditor';
import exportEditedAnimation from './ExportAnimation';
import { fabric } from 'fabric';

const LottieUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [lottieData, setLottieData] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [animationProperties, setAnimationProperties] = useState({
    position: { x: 0, y: 0 },
    scale: { x: 1, y: 1 },
    angle: 0,
    opacity: 1,
  });

  const fabricCanvasRef = useRef(null);
  const fabricObjectRef = useRef(null);

  useEffect(() => {
    fabricCanvasRef.current = new fabric.StaticCanvas(null, {
      width: lottieData ? lottieData.w : 0,
      height: lottieData ? lottieData.h : 0,
    });
  }, [lottieData]);

  const handleFileUpload = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
  
    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const jsonString = event.target.result;
        const parsedData = JSON.parse(jsonString);
  
        setLottieData(parsedData);
        setIsUploaded(true);
      } catch (error) {
        console.error('Error loading file:', error);
      }
    };
    reader.readAsText(file);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setLottieData(null);
    setIsUploaded(false);
  };

  const handleAnimationUpdate = (properties) => {
    setAnimationProperties(properties);
  };

  const handleExport = () => {
    console.log('lottieData:', lottieData);
    console.log('fabricCanvasRef.current:', fabricCanvasRef.current);
  
    if (lottieData && fabricCanvasRef.current) {
      const imageDataUrl = fabricCanvasRef.current.toDataURL();
    
      const animationDataWithImage = {
        ...lottieData,
        image: imageDataUrl,
        w: fabricCanvasRef.current.width,
        h: fabricCanvasRef.current.height,
      };
    
      exportEditedAnimation(animationDataWithImage, animationProperties);
    }
  };

  return (
    <div className="space-y-8">
      {isUploaded ? (
        <div className="relative">
          <Lottie animationData={lottieData} width={lottieData.w} height={lottieData.h} animationProperties={animationProperties} />
          <button onClick={handleCancel} className="absolute top-0 right-0 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200 transition duration-200 ease-in-out">
            X
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gradient-to-br from-blue-200 to-blue-100 dark:from-gray-700 dark:to-gray-800 hover:bg-gradient-to-br dark:hover:from-gray-600 dark:hover:to-gray-700 transition duration-300 ease-in-out">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-12 h-12 mb-4 text-blue-600 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-700 dark:text-gray-300 font-semibold">Click to upload or drag and drop</p>
            </div>
            <input id="dropzone-file" type="file" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      )}
  
      <div className="flex justify-center">
      <button onClick={handleExport} className="text-white bg-gray-800 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-md px-5 py-2.5 text-center transition duration-200 ease-in-out shadow-xl transform hover:scale-105">
          Export Animation
        </button>
      </div>
  
      <AnimationEditor onUpdate={handleAnimationUpdate} initialProperties={animationProperties} />
    </div>
  );
};

export default LottieUploader;