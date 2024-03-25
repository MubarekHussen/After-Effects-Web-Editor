import React, { useState } from 'react';

const FileUploader = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState();

  const handleFileUpload = event => {
    setSelectedFile(event.target.files[0]);
    if (onFileSelect) {
      onFileSelect(event.target.files[0]);
    }
    console.log('File uploaded successfully:', event.target.files[0].name);
  }

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div className="flex-shrink-0">
        <input type="file" onChange={handleFileUpload} className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue" />
      </div>
      <div>
        {selectedFile && <p className="text-sm font-medium text-black">File selected: {selectedFile.name}</p>}
      </div>
    </div>
  );
}

export default FileUploader;