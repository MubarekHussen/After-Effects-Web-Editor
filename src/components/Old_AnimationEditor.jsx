import React, { useState, useEffect } from 'react';

const AnimationEditor = ({ animationData, onAnimationUpdate }) => {
    const [layers, setLayers] = useState(animationData.layers);

    const handleLayerPositionChange = (layerIndex, newPosition) => {
        const updatedLayers = [...layers];
        updatedLayers[layerIndex].position = newPosition;
        setLayers(updatedLayers);
        onAnimationUpdate({ ...animationData, layers: [...updatedLayers] });
        console.log('Updated Layers:', updatedLayers);
    };

    const handleLayerColorChange = (layerIndex, newColor) => {
        const updatedLayers = [...layers];
        updatedLayers[layerIndex].color = newColor;
        setLayers(updatedLayers);
        onAnimationUpdate({ ...animationData, layers: [...updatedLayers] });
        console.log('Updated Layers:', updatedLayers);
    };

    const handleLayerOpacityChange = (layerIndex, newOpacity) => {
        const updatedLayers = [...layers];
        updatedLayers[layerIndex].opacity = newOpacity;
        setLayers(updatedLayers);
        onAnimationUpdate({ ...animationData, layers: [...updatedLayers] });
        console.log('Updated Layers:', updatedLayers);
    };

    const handleKeyPress = (event, layerIndex, property) => {
        if (event.key === 'Enter') {
            if (property === 'position') {
                const newPosition = event.target.value;
                handleLayerPositionChange(layerIndex, newPosition);
            }
        }
    };

    return (
        <div className="p-6 mx-auto bg-white  shadow-md flex flex-col items-center space-y-4 max-w-[65%]">
            <h2 className="text-2xl font-bold mb-4">Animation Editor</h2>
            {layers.map((layer, index) => (
                <div key={index} className="w-full">
                    <h3 className="text-xl font-medium mb-2">Layer {index + 1}</h3>
                    <div className="mb-2">
                        <label className="font-medium">Position:</label>
                        <input
                            type="text"
                            placeholder="(x,y)"
                            value={layer.position || ''}
                            onChange={(e) => handleLayerPositionChange(index, e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, index, 'position')}
                            className="ml-2 px-2 py-1 border rounded w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="font-medium">Color:</label>
                        <input
                            type="color"
                            value={layer.color || '#000000'}
                            onChange={(e) => handleLayerColorChange(index, e.target.value)}
                            className="ml-2"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Opacity:</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={layer.opacity || 1}
                            onChange={(e) => handleLayerOpacityChange(index, e.target.value)}
                            className="ml-2 w-full"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnimationEditor;
