// src/components/Tools/Image/ImageResizer.tsx
import React, { useState, useRef } from 'react';
import { Upload, Download, Crop, RefreshCcw } from 'lucide-react';

const ImageResizer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resizedImageUrl, setResizedImageUrl] = useState<string | null>(null);
  const [newWidth, setNewWidth] = useState<number | ''>('');
  const [newHeight, setNewHeight] = useState<number | ''>('');
  const [feedback, setFeedback] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResizedImageUrl(null);
      setFeedback('');
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          imgRef.current = img;
          setNewWidth(img.width); // Pre-fill with original dimensions
          setNewHeight(img.height);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = () => {
    if (!selectedFile || !imgRef.current || typeof newWidth !== 'number' || newWidth <= 0 || typeof newHeight !== 'number' || newHeight <= 0) {
      setFeedback('Please upload an image and enter valid dimensions.');
      return;
    }

    setFeedback('Resizing...');
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(imgRef.current, 0, 0, newWidth, newHeight);

        const resizedDataUrl = canvas.toDataURL(selectedFile.type); // Keep original format
        setResizedImageUrl(resizedDataUrl);
        setFeedback('Resizing successful!');
      }
    }
  };

  const handleDownload = () => {
    if (resizedImageUrl && selectedFile) {
      const link = document.createElement('a');
      const originalFileName = selectedFile.name.split('.').slice(0, -1).join('.');
      const outputExtension = selectedFile.name.split('.').pop();
      link.download = `${originalFileName}_${newWidth}x${newHeight}.${outputExtension}`;
      link.href = resizedImageUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResizedImageUrl(null);
    setNewWidth('');
    setNewHeight('');
    setFeedback('');
    if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if(ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Image Resizer</h2>
      <p className="text-textLight mb-4">
        Resize your images to custom dimensions directly in your browser.
      </p>

      <div>
        <label htmlFor="image-upload-resize" className="flex items-center justify-center px-6 py-3 border border-borderLight rounded-lg cursor-pointer bg-blue-50 text-primary hover:bg-blue-100 transition-colors font-medium">
          <Upload size={20} className="mr-2" /> Upload Image
          <input
            id="image-upload-resize"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {feedback && <p className={`text-sm ${feedback.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}

      {selectedFile && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="newWidth" className="block text-textDark text-sm font-medium mb-2">
                New Width (pixels)
              </label>
              <input
                type="number"
                id="newWidth"
                value={newWidth}
                onChange={(e) => setNewWidth(parseFloat(e.target.value) || '')}
                placeholder="e.g., 800"
                className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="newHeight" className="block text-textDark text-sm font-medium mb-2">
                New Height (pixels)
              </label>
              <input
                type="number"
                id="newHeight"
                value={newHeight}
                onChange={(e) => setNewHeight(parseFloat(e.target.value) || '')}
                placeholder="e.g., 600"
                className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={resizeImage}
              className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
            >
              <Crop size={20} className="mr-2" /> Resize Image
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
            >
              <RefreshCcw size={18} className="mr-2" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-borderLight rounded-xl p-4 text-center">
              <p className="text-textDark font-medium mb-2">Original Image</p>
              <img src={URL.createObjectURL(selectedFile)} alt="Original" className="max-w-full h-auto mx-auto rounded-md shadow-inner" style={{ maxHeight: '250px' }} />
            </div>

            {resizedImageUrl && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <h3 className="text-xl font-semibold text-textDark mb-3">Resized Image:</h3>
                <img src={resizedImageUrl} alt="Resized" className="max-w-full h-auto mx-auto rounded-md shadow-inner" style={{ maxHeight: '250px' }} />
                <button
                  onClick={handleDownload}
                  className="mt-4 bg-accent text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center mx-auto"
                >
                  <Download size={20} className="mr-2" /> Download Resized
                </button>
              </div>
            )}
          </div>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default ImageResizer;
