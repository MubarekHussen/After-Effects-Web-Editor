import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AnimationEditor = ({ onUpdate, initialProperties }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState({ x: 1, y: 1 });
  const [angle, setAngle] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (initialProperties) {
      const { position: initialPosition, scale: initialScale, angle: initialAngle, opacity: initialOpacity } = initialProperties;
      setPosition(initialPosition || { x: 0, y: 0 });
      setScale(initialScale || { x: 1, y: 1 });
      setAngle(initialAngle || 0);
      setOpacity(initialOpacity || 1);
    }
  }, [initialProperties]);

  const handlePositionChange = (e) => {
    const { name, value } = e.target;
    setPosition((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };
  
  const handleScaleChange = (e) => {
    const value = parseFloat(e.target.value);
    setScale({ x: value, y: value });
  };

  const handleAngleChange = (e) => {
    const value = parseFloat(e.target.value);
    setAngle(value);
  };

  const handleOpacityChange = (e) => {
    const value = parseFloat(e.target.value);
    setOpacity(value);
  };  

  const handleUpdate = () => {
    onUpdate({ position, scale, angle, opacity });
  };

  return (
    <section className="bg-gray-800">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        {/* <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Animation Editor</h2> */}
        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position X:</label>
            <input
              type="number"
              name="x"
              value={position.x}
              onChange={handlePositionChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position Y:</label>
            <input
              type="number"
              name="y"
              value={position.y}
              onChange={handlePositionChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Scale:</label>
            <input
              type="number"
              value={scale.x}
              step="0.1"
              min="0"
              onChange={handleScaleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Angle:</label>
            <input
              type="number"
              value={angle}
              onChange={handleAngleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opacity:</label>
            <input
              type="number"
              value={opacity}
              step="0.1"
              min="0"
              max="1"
              onChange={handleOpacityChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={handleUpdate} className="text-white bg-primary-700 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-md px-5 py-2.5 text-center transition duratino-200 ease-in-out shadow-xl transform hover:scale-105">
              Update Animation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

AnimationEditor.propTypes = {
    onUpdate: PropTypes.func.isRequired,
    initialProperties: PropTypes.shape({
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

export default AnimationEditor;