'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
// import { toast } from '@/components/ui/use-toast';

const FileUploadComponent = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Simulated upload states for each file
  const getInitialFileState = () => ({
    progress: 0,
    status: 'selected', // selected, uploading, success, error
    error: null
  });

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processFiles = (fileList) => {
    const newFiles = Array.from(fileList)?.map(file => {
      const fileData = {
        file,
        id: `${file.name}-${Date.now()}`,
        ...getInitialFileState(),
      };

      // Add preview URL for image files
      if (file.type.startsWith('image/')) {
        fileData.previewUrl = URL.createObjectURL(file);
      }

      return fileData;
    });

    setFiles(prev => [...prev, ...newFiles]);
    // Files are now just selected, not automatically uploaded
  };

  // Clean up object URLs on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      files.forEach(fileObj => {
        if (fileObj.previewUrl) {
          URL.revokeObjectURL(fileObj.previewUrl);
        }
      });
    };
  }, [files]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const removeFile = (id) => {
    // Release the object URL before removing the file
    const fileToRemove = files.find(file => file.id === id);
    if (fileToRemove?.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    setFiles(files.filter(file => file.id !== id));
  };

  // Simulate file upload with progress
  const simulateFileUpload = (fileId) => {
    setFiles(prev => 
      prev?.map(file => 
        file.id === fileId 
          ? { ...file, status: 'uploading' } 
          : file
      )
    );

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      
      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;
        
        // Randomly succeed or fail for demo purposes (90% success rate)
        const success = Math.random() > 0.1;
        
        setFiles(prev => 
          prev?.map(file => 
            file.id === fileId 
              ? { 
                  ...file, 
                  progress, 
                  status: success ? 'success' : 'error',
                  error: success ? null : 'Upload failed. Please try again.'
                } 
              : file
          )
        );

        if (success) {
        //   toast({
        //     title: "File uploaded successfully",
        //     description: `${files.find(f => f.id === fileId)?.file.name} has been uploaded.`,
        //   });
        // } else {
        //   toast({
        //     title: "Upload failed",
        //     description: `Failed to upload ${files.find(f => f.id === fileId)?.file.name}.`,
        //     variant: "destructive",
        //   });
        }
      } else {
        setFiles(prev => 
          prev?.map(file => 
            file.id === fileId 
              ? { ...file, progress } 
              : file
          )
        );
      }
    }, 200);
  };

  // New function to start uploading all selected files
  const startUpload = () => {
    const selectedFiles = files.filter(file => file.status === 'selected');

    if (selectedFiles.length > 0) {
      selectedFiles.forEach(fileObj => {
        simulateFileUpload(fileObj.id);
      });
    }
  };

  // File status icon component
  const FileStatusIcon = ({ status }) => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'selected':
        return null;
      default:
        return null;
    }
  };

  // Check if there are any selected files that can be uploaded
  const hasFilesToUpload = files.some(file => file.status === 'selected');

  // Check if there are any files currently uploading
  const hasUploadingFiles = files.some(file => file.status === 'uploading');

  // Check if file is an image
  const isImageFile = (file) => {
    return file.type.startsWith('image/');
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Drop zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 bg-gray-50'
        } transition-all duration-200 ease-in-out`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInputChange}
          ref={fileInputRef}
        />
        
        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        
        <h3 className="text-lg font-semibold mb-2">
          Drag and drop your files here
        </h3>
        
        <p className="text-sm text-gray-500 mb-4">
          or click to browse your files
        </p>
        
        <Button 
          variant="outline" 
          onClick={handleButtonClick}
        >
          Select Files
        </Button>
      </div>

      {/* File list with fixed height and scrolling */}
      {files.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">Files ({files.length})</h4>

            {hasFilesToUpload && (
              <Button
                onClick={startUpload}
                disabled={hasUploadingFiles}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {hasUploadingFiles ? 'Uploading...' : 'Start Upload'}
              </Button>
            )}
          </div>
          
          {/* Scrollable container with fixed height */}
          <div className="max-h-100 overflow-y-auto pr-1 space-y-3 rounded-md border border-gray-200">
            {files?.map((fileObj) => (
              <Card key={fileObj.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileStatusIcon status={fileObj.status} />
                      <span className="text-sm font-medium truncate max-w-xs">
                        {fileObj.file.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({(fileObj.file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeFile(fileObj.id)}
                      disabled={fileObj.status === 'uploading'}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Show image preview for image files */}
                  {fileObj.previewUrl && (
                    <div className="mt-2 mb-2 flex items-center">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={fileObj.previewUrl}
                          alt={fileObj.file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        Image preview
                      </span>
                    </div>
                  )}

                  {/* Show file type icon for non-image files */}
                  {!fileObj.previewUrl && (
                    <div className="mt-2 mb-2 flex items-center">
                      <div className="p-2 bg-gray-100 rounded-md">
                        <ImageIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {fileObj.file.type || 'Unknown file type'}
                      </span>
                    </div>
                  )}

                  {fileObj.status !== 'selected' && (
                    <Progress
                      value={fileObj.progress}
                      className={`h-1 ${fileObj.status === 'error'
                        ? 'bg-red-100'
                        : fileObj.status === 'success'
                          ? 'bg-green-100'
                          : 'bg-blue-100'
                        }`}
                    />
                  )}

                  {fileObj.error && (
                    <p className="text-xs text-red-500 mt-1">{fileObj.error}</p>
                  )}

                  {fileObj.status === 'selected' && (
                    <p className="text-xs text-gray-500 mt-1">Ready to upload</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;