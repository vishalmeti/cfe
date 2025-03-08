'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
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
    status: 'idle', // idle, uploading, success, error
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
    const newFiles = Array.from(fileList).map(file => ({
      file,
      id: `${file.name}-${Date.now()}`,
      ...getInitialFileState()
    }));

    setFiles(prev => [...prev, ...newFiles]);
    
    // Simulate uploading each file
    newFiles.forEach(fileObj => {
      simulateFileUpload(fileObj.id);
    });
  };

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
    setFiles(files.filter(file => file.id !== id));
  };

  // Simulate file upload with progress
  const simulateFileUpload = (fileId) => {
    setFiles(prev => 
      prev.map(file => 
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
          prev.map(file => 
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
          prev.map(file => 
            file.id === fileId 
              ? { ...file, progress } 
              : file
          )
        );
      }
    }, 200);
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
      default:
        return null;
    }
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

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          <h4 className="font-medium">Files ({files.length})</h4>
          
          {files.map((fileObj) => (
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
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <Progress 
                  value={fileObj.progress} 
                  className={`h-1 ${
                    fileObj.status === 'error' 
                      ? 'bg-red-100' 
                      : fileObj.status === 'success' 
                        ? 'bg-green-100' 
                        : 'bg-blue-100'
                  }`}
                />
                
                {fileObj.error && (
                  <p className="text-xs text-red-500 mt-1">{fileObj.error}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;