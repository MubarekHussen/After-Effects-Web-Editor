import React from 'react';

const ExportButton = ({ animationData }) => {
  const handleExport = () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Animation</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.7.14/lottie.min.js"></script>
      </head>
      <body>
        <div id="animation"></div>
        <script>
          var animationData = ${JSON.stringify(animationData)};
          lottie.loadAnimation({
            container: document.getElementById('animation'),
            renderer: 'canvas',
            loop: true,
            autoplay: true,
            animationData: animationData
          });
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'animation.html';
    link.click();

    URL.revokeObjectURL(url);
  };

  return <button onClick={handleExport} className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">Export</button>;
};

export default ExportButton;