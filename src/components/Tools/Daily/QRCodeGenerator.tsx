// src/components/Tools/Daily/QRCodeGenerator.tsx
import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react'; // You'll need to install this library
import { QrCode, Download, RefreshCcw } from 'lucide-react';

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState<string>('https://www.fymotools.com');
  const [qrSize, setQrSize] = useState<number>(256);
  const [qrColor, setQrColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');
  const [feedback, setFeedback] = useState<string>('');
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!text) {
      setFeedback('Please enter text/URL to generate QR code first.');
      return;
    }
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setFeedback('QR Code downloaded!');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const handleReset = () => {
    setText('https://www.fymotools.com');
    setQrSize(256);
    setQrColor('#000000');
    setBgColor('#FFFFFF');
    setFeedback('');
  };

  // Install qrcode.react: npm install qrcode.react
  // Make sure to add 'qrcode.react' to your package.json dependencies.

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">QR Code Generator</h2>
      <p className="text-textLight mb-4">
        Generate QR codes for text, URLs, or any information. Customize size and colors, then download the image.
      </p>

      <div>
        <label htmlFor="qr-text" className="block text-textDark text-sm font-medium mb-2">
          Text or URL for QR Code
        </label>
        <textarea
          id="qr-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., https://www.fymotools.com or Your text here"
          rows={3}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="qr-size" className="block text-textDark text-sm font-medium mb-2">
            Size (pixels)
          </label>
          <input
            type="number"
            id="qr-size"
            value={qrSize}
            onChange={(e) => setQrSize(parseInt(e.target.value) || 0)}
            min="64"
            max="1024"
            step="32"
            className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="qr-color" className="block text-textDark text-sm font-medium mb-2">
            QR Color
          </label>
          <input
            type="color"
            id="qr-color"
            value={qrColor}
            onChange={(e) => setQrColor(e.target.value)}
            className="w-full h-12 p-1 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="bg-color" className="block text-textDark text-sm font-medium mb-2">
            Background Color
          </label>
          <input
            type="color"
            id="bg-color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full h-12 p-1 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
        <button
          onClick={handleDownload}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <Download size={20} className="mr-2" /> Download QR Code
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <RefreshCcw size={18} className="mr-2" /> Reset
        </button>
      </div>

      {feedback && <p className={`text-sm ${feedback.includes('downloaded') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}

      {text && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark border border-blue-200 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-textDark mb-3">Generated QR Code:</h3>
          <div ref={qrRef} className="p-2 bg-white rounded-md shadow-inner">
            <QRCode
              value={text}
              size={qrSize}
              fgColor={qrColor}
              bgColor={bgColor}
              level="H" // High error correction level
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
