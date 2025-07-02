// src/components/Tools/Image/ImageFilterApplier.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Download, Upload, RotateCw, RefreshCcw } from 'lucide-react'; // Icons for download, upload, reset

const ImageFilterApplier: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>('none');
  const [fileName, setFileName] = useState<string>('filtered_image.png');

  const filters = [
    { name: 'None', value: 'none' },
    { name: 'Grayscale', value: 'grayscale(100%)' },
    { name: 'Sepia', value: 'sepia(100%)' },
    { name: 'Brightness (150%)', value: 'brightness(150%)' },
    { name: 'Contrast (150%)', value: 'contrast(150%)' },
    { name: 'Blur (5px)', value: 'blur(5px)' },
    { name: 'Invert', value: 'invert(100%)' },
  ];

  // Function to draw image on canvas with filter
  const applyFilterToCanvas = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (canvas && image && originalImage) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas dimensions to image dimensions
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Apply filter to context (modern way with CSS filter property)
        // For older browsers or complex filters, pixel manipulation would be needed
        ctx.filter = currentFilter;

        // Draw image
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
    }
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setOriginalImage(e.target?.result as string);
          // Set filename for download
          const nameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
          setFileName(`${nameWithoutExtension}_filtered.png`);
        };
        img.src = e.target?.result as string;
        imageRef.current = img; // Store image in ref
      };
      reader.readAsDataURL(file);
      setCurrentFilter('none'); // Reset filter on new upload
    }
  };

  // Re-apply filter whenever currentFilter or originalImage changes
  useEffect(() => {
    applyFilterToCanvas();
  }, [currentFilter, originalImage]);

  // Handle filter selection
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentFilter(event.target.value);
  };

  // Download filtered image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = fileName;
      link.href = canvas.toDataURL('image/png'); // Download as PNG
      link.click();
    }
  };

  // Reset to original image and no filter
  const handleReset = () => {
    setOriginalImage(null);
    setCurrentFilter('none');
    setFileName('filtered_image.png');
    if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if(ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.filter = 'none'; // Reset canvas filter property
        }
    }
  };


  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-2xl font-semibold text-textDark">Image Filter Applier</h2>
      <p className="text-textLight">
        Apply various artistic filters to your images directly in your browser. Upload an image, choose a filter, and download the result.
      </p>

      {/* Upload Section */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <label htmlFor="image-upload" className="flex items-center justify-center px-6 py-3 border border-borderLight rounded-lg cursor-pointer bg-blue-50 text-primary hover:bg-blue-100 transition-colors font-medium">
          <Upload size={20} className="mr-2" /> Upload Image
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {originalImage && (
          <div className="flex items-center space-x-4">
            <select
              value={currentFilter}
              onChange={handleFilterChange}
              className="p-3 border border-borderLight rounded-md bg-white text-textDark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {filters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleReset}
              className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
            >
              <RefreshCcw size={18} className="mr-2" /> Reset
            </button>
          </div>
        )}
      </div>

      {/* Image Preview and Canvas */}
      {originalImage ? (
        <div className="flex flex-col items-center border border-borderLight rounded-xl p-4 bg-gray-50">
          <img
            ref={imageRef}
            src={originalImage}
            alt="Original Preview"
            style={{ display: 'none' }} // Hide actual img tag, use it for its natural dimensions
            onLoad={applyFilterToCanvas} // Ensure canvas is drawn after image loads
          />
          <canvas
            ref={canvasRef}
            className="max-w-full h-auto border border-gray-300 rounded-md shadow-inner"
            style={{ maxWidth: '100%', maxHeight: '600px' }} // Limit max size for display
          />
          <button
            onClick={handleDownload}
            className="mt-6 bg-accent text-white py-3 px-8 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center"
          >
            <Download size={20} className="mr-2" /> Download Filtered Image
          </button>
        </div>
      ) : (
        <div className="bg-gray-100 border border-borderLight rounded-xl p-12 text-center text-textLight">
          <p className="text-xl">Upload an image to start applying filters.</p>
        </div>
      )}
    </div>
  );
};

export default ImageFilterApplier;
