// src/components/Tools/Image/JPGtoPNGConverter.tsx
import React, { useState, useRef } from 'react';
import { Upload, Download, Convert, RefreshCcw } from 'lucide-react';

const JPGtoPNGConverter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
        setFeedback('Please upload a JPG image.');
        setSelectedFile(null);
        setConvertedImageUrl(null);
        return;
      }
      setSelectedFile(file);
      setConvertedImageUrl(null); // Reset previous conversion
      setFeedback('');
    }
  };

  const convertImage = () => {
    if (!selectedFile) {
      setFeedback('Please select a JPG image first.');
      return;
    }

    setFeedback('Converting...');
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Convert canvas content to PNG data URL
            const pngDataUrl = canvas.toDataURL('image/png');
            setConvertedImageUrl(pngDataUrl);
            setFeedback('Conversion successful!');
          }
        }
      };
      img.src = e.target?.result as string;
      imgRef.current = img; // Store for potential re-use or dimensions
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDownload = () => {
    if (convertedImageUrl) {
      const link = document.createElement('a');
      link.download = `${selectedFile?.name.split('.')[0] || 'converted'}.png`;
      link.href = convertedImageUrl;
      document.body.appendChild(link); // Required for Firefox
      link.click();
      document.body.removeChild(link); // Clean up
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setConvertedImageUrl(null);
    setFeedback('');
    if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if(ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">JPG to PNG Converter</h2>
      <p className="text-textLight mb-4">
        Quickly convert your JPG images to PNG format directly in your browser without uploading to any server.
      </p>

      <div>
        <label htmlFor="image-upload-jpg" className="flex items-center justify-center px-6 py-3 border border-borderLight rounded-lg cursor-pointer bg-blue-50 text-primary hover:bg-blue-100 transition-colors font-medium">
          <Upload size={20} className="mr-2" /> Upload JPG Image
          <input
            id="image-upload-jpg"
            type="file"
            accept="image/jpeg,image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {feedback && <p className={`text-sm ${feedback.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}

      {selectedFile && !convertedImageUrl && (
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          <button
            onClick={convertImage}
            className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
          >
            <Convert size={20} className="mr-2" /> Convert to PNG
          </button>
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center justify-center"
          >
            <RefreshCcw size={18} className="mr-2" /> Reset
          </button>
        </div>
      )}

      {selectedFile && (
        <div className="bg-gray-50 border border-borderLight rounded-xl p-4 text-center">
          <p className="text-textDark font-medium mb-2">Original JPG Preview:</p>
          <img src={URL.createObjectURL(selectedFile)} alt="Original JPG" className="max-w-full h-auto mx-auto rounded-md shadow-inner" style={{ maxHeight: '300px' }} />
        </div>
      )}

      {convertedImageUrl && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center mt-4">
          <h3 className="text-xl font-semibold text-textDark mb-3">Converted PNG Image:</h3>
          <img src={convertedImageUrl} alt="Converted PNG" className="max-w-full h-auto mx-auto rounded-md shadow-inner" style={{ maxHeight: '300px' }} />
          <button
            onClick={handleDownload}
            className="mt-6 bg-accent text-white py-3 px-8 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center mx-auto"
          >
            <Download size={20} className="mr-2" /> Download PNG
          </button>
          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center justify-center mx-auto"
          >
            <RefreshCcw size={18} className="mr-2" /> Convert Another
          </button>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas> {/* Hidden canvas for conversion */}
    </div>
  );
};

export default JPGtoPNGConverter;
