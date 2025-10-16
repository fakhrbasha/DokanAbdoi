'use client';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

// MUI
import { Box, Typography, Button, Stack } from '@mui/material';

// Components
import UploadSingleFile from '@/components/upload/upload-single-file';
import { useUploadSingleFile } from '@/hooks/use-upload-file';

export default function BunnyUploadExample(): React.JSX.Element {
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { mutate: uploadFile, isPending } = useUploadSingleFile(
    // Success callback
    (data) => {
      console.log('Upload successful:', data);
      setUploadedFile(data);
      toast.success('File uploaded successfully!');
      setUploadProgress(0);
    },
    // Error callback
    (error) => {
      console.error('Upload failed:', error);
      toast.error('Upload failed: ' + error.message);
      setUploadProgress(0);
    }
  );

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      
      // Create preview URL for immediate display
      const previewUrl = URL.createObjectURL(file);
      setUploadedFile({ preview: previewUrl, name: file.name });
      
      // Start upload
      uploadFile({
        file,
        config: {
          onProgress: (progress: number) => {
            setUploadProgress(progress);
          }
        }
      });
    }
  };

  const handleRemove = () => {
    setUploadedFile(null);
    setUploadProgress(0);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Bunny.net Upload Example
      </Typography>
      
      <Stack spacing={3}>
        <UploadSingleFile
          file={uploadedFile}
          onDrop={handleDrop}
          loading={uploadProgress}
        />

        {uploadedFile && (
          <Stack spacing={2}>
            <Typography variant="subtitle1">
              Uploaded File: {uploadedFile.name || 'Unknown'}
            </Typography>
            
            {uploadedFile.url && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Public URL: {uploadedFile.url}
                </Typography>
              </Box>
            )}
            
            <Button variant="outlined" onClick={handleRemove}>
              Remove File
            </Button>
          </Stack>
        )}

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Instructions:</strong>
            <br />
            1. Configure your Bunny.net Storage Zone and Access Key in the admin settings
            <br />
            2. Drag and drop a file or click to browse
            <br />
            3. The file will be uploaded directly to your Bunny.net storage
            <br />
            4. You'll receive a public URL for the uploaded file
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

