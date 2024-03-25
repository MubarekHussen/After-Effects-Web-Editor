import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import AnimationPlayer from './components/AnimationPlayer';
import AnimationEditor from './components/AnimationEditor';

const App = () => {
  const [animationData, setAnimationData] = useState(null);

  // Function to handle file selection
  const handleFileSelect = async (file) => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      const data = await convertFileToJson(file);
      setAnimationData(data);
    } catch (error) {
      console.error('Failed to convert file to JSON:', error);
    }
  };

  // Function to convert file to JSON
  const convertFileToJson = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          resolve(json);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  // Function to handle animation updates
  const handleAnimationUpdate = (updatedAnimationData) => {
    setAnimationData(updatedAnimationData);
  };

  return (
    <div className="App w-full">
      <FileUploader onFileSelect={handleFileSelect} />
      {animationData && (
        <div>
          <AnimationPlayer animationData={animationData} />
          <AnimationEditor animationData={animationData} onAnimationUpdate={handleAnimationUpdate} />
        </div>
      )}
    </div>
  );
};

export default App;