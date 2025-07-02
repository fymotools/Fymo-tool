// src/pages/image-tools.tsx
import React from 'react';
import ToolContainer from '../components/Tools/ToolContainer';
import ImageFilterApplier from '../components/Tools/Image/ImageFilterApplier';
import JPGtoPNGConverter from '../components/Tools/Image/JPGtoPNGConverter';
import ImageCompressor from '../components/Tools/Image/ImageCompressor'; // NEW IMPORT
import ImageResizer from '../components/Tools/Image/ImageResizer'; // NEW IMPORT
import ImageToBase64 from '../components/Tools/Image/ImageToBase64'; // NEW IMPORT

const ImageToolsPage: React.FC = () => {
  return (
    <ToolContainer
      title="Image Tools"
      description="A suite of powerful and easy-to-use online image tools for compression, resizing, format conversion, and applying stunning filters."
    >
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <ImageFilterApplier />
        <JPGtoPNGConverter />
        <ImageCompressor /> {/* ADDED */}
        <ImageResizer /> {/* ADDED */}
        <ImageToBase64 /> {/* ADDED */}
      </div>
    </ToolContainer>
  );
};

export default ImageToolsPage;
