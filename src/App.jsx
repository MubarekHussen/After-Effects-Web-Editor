import React from 'react';
import LottieUploader from './components/LottieUploader';

const App = () => {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-4xl font-semibold text-center mb-8">Animation Editor</h1>
      <LottieUploader />
    </div>
  );
};

export default App;