// src/components/Tools/Image/ImageCompressor.tsx
import React, { useState, useRef } from 'react';
import { Upload, Download, Maximize2, Minimize2, RefreshCcw } from 'lucide-react';

const ImageCompressor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedImageUrl, setCompressedImageUrl] = useState<string | null>(null);
  const [compressionQuality, setCompressionQuality] = useState<number>(0.7); // 0.1 to 1.0
  const [originalSize, setOriginalSize] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setOriginalSize(formatBytes(file.size));
      setCompressedImageUrl(null); // Reset previous compression
      setCompressedSize(null);
      setFeedback('');
    }
  };

  const compressImage = () => {
    if (!selectedFile) {
      setFeedback('Please select an image first.');
      return;
    }

    setFeedback('Compressing...');
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

            // Compress as JPEG or PNG based on original type, with quality
            const outputMimeType = selectedFile.type === 'image/png' ? 'image/png' : 'image/jpeg';
            const compressedDataUrl = canvas.toDataURL(outputMimeType, compressionQuality);
            setCompressedImageUrl(compressedDataUrl);

            // Calculate compressed size
            const base64Length = compressedDataUrl.length - (compressedDataUrl.indexOf(',') + 1);
            const padding = (compressedDataUrl.endsWith('==') ? 2 : compressedDataUrl.endsWith('=') ? 1 : 0);
            const compressedBytes = base64Length * 0.75 - padding; // Approx bytes from base64
            setCompressedSize(formatBytes(compressedBytes));

            setFeedback('Compression successful!');
          }
        }
      };
      img.src = e.target?.result as string;
      imgRef.current = img;
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDownload = () => {
    if (compressedImageUrl && selectedFile) {
      const link = document.createElement('a');
      const originalFileName = selectedFile.name.split('.').slice(0, -1).join('.');
      const outputExtension = selectedFile.type === 'image/png' ? 'png' : 'jpg';
      link.download = `${originalFileName}_compressed.${outputExtension}`;
      link.href = compressedImageUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setCompressedImageUrl(null);
    setCompressionQuality(0.7);
    setOriginalSize(null);
    setCompressedSize(null);
    setFeedback('');
    if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if(ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Image Compressor</h2>
      <p className="text-textLight mb-4">
        Reduce the file size of your images (JPG, PNG) without significant loss of quality, directly in your browser.
      </p>

      <div>
        <label htmlFor="image-upload-compress" className="flex items-center justify-center px-6 py-3 border border-borderLight rounded-lg cursor-pointer bg-blue-50 text-primary hover:bg-blue-100 transition-colors font-medium">
          <Upload size={20} className="mr-2" /> Upload Image (JPG or PNG)
          <input
            id="image-upload-compress"
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {selectedFile && (
        <>
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="quality" className="block text-textDark text-sm font-medium mb-2">
                Compression Quality ({Math.round(compressionQuality * 100)}%)
              </label>
              <input
                type="range"
                id="quality"
                min="0.1"
                max="1.0"
                step="0.05"
                value={compressionQuality}
                onChange={(e) => setCompressionQuality(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            <button
              onClick={compressImage}
              className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
            >
              <Minimize2 size={20} className="mr-2" /> Compress Image
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
            >
              <RefreshCcw size={18} className="mr-2" /> Reset
            </button>
          </div>

          {feedback && <p className={`text-sm ${feedback.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-borderLight rounded-xl p-4 text-center">
              <p className="text-textDark font-medium mb-2 flex items-center justify-center"><Maximize2 size={20} className="mr-2"/> Original Image</p>
              <img src={URL.createObjectURL(selectedFile)} alt="Original" className="max-w-full h-auto mx-auto rounded-md shadow-inner" style={{ maxHeight: '250px' }} />
              {originalSize && <p className="text-sm text-gray-600 mt-2">Size: {originalSize}</p>}
            </div>

            {compressedImageUrl && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <p className="text-textDark font-medium mb-2 flex items-center justify-center"><Minimize2 size={20} className="mr-2"/> Compressed Image</p>
                <img src={compressedImageUrl} alt="Compressed" className="max-w-full h-auto mx-auto rounded-md shadow-inner" style={{ maxHeight: '250px' }} />
                {compressedSize && <p className="text-sm text-gray-600 mt-2">Size: {compressedSize}</p>}
                <button
                  onClick={handleDownload}
                  className="mt-4 bg-accent text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center mx-auto"
                >
                  <Download size={20} className="mr-2" /> Download
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

export default ImageCompressor;
