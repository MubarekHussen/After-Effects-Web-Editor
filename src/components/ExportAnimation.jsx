import { fabric } from 'fabric';

const exportEditedAnimation = (animationData, animationProperties) => {
  const canvas = new fabric.StaticCanvas(null, {
    width: animationData.w,
    height: animationData.h
  });

  const img = new Image();
  img.crossOrigin = 'anonymous';

  const imageLoadPromise = new Promise((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
  });

  img.src = animationData.image;

  imageLoadPromise.then(() => {
    const fabricImage = new fabric.Image(img);
    fabricImage.set({
      left: animationProperties.position.x,
      top: animationProperties.position.y,
      scaleX: animationProperties.scale.x,
      scaleY: animationProperties.scale.y,
      angle: animationProperties.angle,
      opacity: animationProperties.opacity,
    });

    canvas.add(fabricImage);

    canvas.renderAll();

    const dataURL = canvas.toDataURL();

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Edited Animation</title>
      </head>
      <body>
        <canvas id="animation-canvas" width="${animationData.w}" height="${animationData.h}"></canvas>
        <script>
          // Draw the canvas content onto the HTML canvas
          var canvas = document.getElementById('animation-canvas');
          var ctx = canvas.getContext('2d');
          var img = new Image();
          img.onload = function() {
            ctx.drawImage(img, 0, 0);
          };
          img.src = '${dataURL}';
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'edited-animation.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch(error => {
    console.error('Error loading image:', error);
  });
};

export default exportEditedAnimation;
