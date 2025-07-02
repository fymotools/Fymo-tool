// src/components/Tools/Image/ImageToBase64.tsx
import React, { useState } from 'react';
import { Upload, Copy, RefreshCcw, Image } from 'lucide-react';

const ImageToBase64: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64String, setBase64String] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setBase64String(null);
      setFeedback('');

      const reader = new FileReader();
      reader.onload = (e) => {
        setBase64String(e.target?.result as string);
        setFeedback('Image converted to Base64 successfully!');
      };
      reader.onerror = () => {
        setFeedback('Error converting image.');
        setBase64String(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = () => {
    if (base64String) {
      navigator.clipboard.writeText(base64String);
      setFeedback('Base64 string copied to clipboard!');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setBase64String(null);
    setFeedback('');
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Image to Base64 Converter</h2>
      <p className="text-textLight mb-4">
        Convert any image (JPG, PNG, GIF) into a Base64 string, useful for embedding images directly into HTML/CSS or data transfer.
      </p>

      <div>
        <label htmlFor="image-upload-base64" className="flex items-center justify-center px-6 py-3 border border-borderLight rounded-lg cursor-pointer bg-blue-50 text-primary hover:bg-blue-100 transition-colors font-medium">
          <Upload size={20} className="mr-2" /> Upload Image
          <input
            id="image-upload-base64"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {feedback && <p className={`text-sm ${feedback.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}

      {selectedFile && !base64String && <p className="text-center text-textLight">Processing image...</p>}

      {base64String && (
        <div className="bg-blue-50 p-4 rounded-md text-primary-dark border border-blue-200">
          <h3 className="text-xl font-semibold text-textDark mb-3">Base64 Output:</h3>
          <textarea
            readOnly
            value={base64String}
            rows={8}
            className="w-full p-3 border border-borderLight rounded-md bg-white text-sm font-mono overflow-auto resize-y"
          ></textarea>
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mt-4">
            <button
              onClick={handleCopy}
              className="flex-1 bg-accent text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center"
            >
              <Copy size={20} className="mr-2" /> Copy to Clipboard
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center justify-center"
            >
              <RefreshCcw size={18} className="mr-2" /> Convert Another
            </button>
          </div>
          <div className="mt-4 bg-gray-100 p-3 rounded-md text-center">
            <p className="text-textDark font-medium mb-2">Image Preview from Base64:</p>
            <Image size={64} className="mx-auto text-gray-400 mb-2" /> {/* Placeholder icon */}
            <img src={base64String} alt="Base64 Preview" className="max-w-full h-auto mx-auto rounded-md shadow-inner" style={{ maxHeight: '200px' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageToBase64;
