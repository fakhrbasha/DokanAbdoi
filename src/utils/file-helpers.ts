// File upload and management utilities

// File validation
export const validateFile = {
  size: (file: File, maxSizeInMB: number): boolean => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
  },

  type: (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(file.type);
  },

  image: (file: File): boolean => {
    const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    return this.type(file, imageTypes);
  },

  document: (file: File): boolean => {
    const documentTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain'
    ];
    return this.type(file, documentTypes);
  },

  video: (file: File): boolean => {
    const videoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm'];
    return this.type(file, videoTypes);
  },

  audio: (file: File): boolean => {
    const audioTypes = ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/aac'];
    return this.type(file, audioTypes);
  }
};

// File size formatting
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// File type detection
export const getFileType = (file: File): string => {
  const type = file.type;
  
  if (type.startsWith('image/')) return 'image';
  if (type.startsWith('video/')) return 'video';
  if (type.startsWith('audio/')) return 'audio';
  if (type.includes('pdf')) return 'pdf';
  if (type.includes('word') || type.includes('document')) return 'document';
  if (type.includes('excel') || type.includes('spreadsheet')) return 'spreadsheet';
  if (type.includes('text/')) return 'text';
  if (type.includes('zip') || type.includes('rar') || type.includes('7z')) return 'archive';
  
  return 'unknown';
};

// File icon mapping
export const getFileIcon = (file: File): string => {
  const type = getFileType(file);
  
  const iconMap: Record<string, string> = {
    image: '🖼️',
    video: '🎥',
    audio: '🎵',
    pdf: '📄',
    document: '📝',
    spreadsheet: '📊',
    text: '📄',
    archive: '📦',
    unknown: '📁'
  };

  return iconMap[type] || iconMap.unknown;
};

// Image utilities
export const imageUtils = {
  // Create image preview
  createPreview: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to create image preview'));
      };
      
      reader.readAsDataURL(file);
    });
  },

  // Get image dimensions
  getDimensions: (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = URL.createObjectURL(file);
    });
  },

  // Resize image
  resize: (
    file: File,
    maxWidth: number,
    maxHeight: number,
    quality: number = 0.8
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and resize
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(resizedFile);
            } else {
              reject(new Error('Failed to resize image'));
            }
          },
          file.type,
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = URL.createObjectURL(file);
    });
  },

  // Compress image
  compress: (file: File, maxSizeInKB: number): Promise<File> => {
    return new Promise((resolve, reject) => {
      let quality = 0.8;
      
      const compress = () => {
        imageUtils.resize(file, 1920, 1080, quality)
          .then((resizedFile) => {
            if (resizedFile.size <= maxSizeInKB * 1024 || quality <= 0.1) {
              resolve(resizedFile);
            } else {
              quality -= 0.1;
              compress();
            }
          })
          .catch(reject);
      };

      compress();
    });
  }
};

// File upload utilities
export const uploadUtils = {
  // Create FormData for file upload
  createFormData: (file: File, additionalData?: Record<string, any>): FormData => {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
    
    return formData;
  },

  // Upload with progress tracking
  uploadWithProgress: async (
    file: File,
    uploadUrl: string,
    onProgress?: (progress: number) => void,
    additionalData?: Record<string, any>
  ): Promise<any> => {
    const formData = this.createFormData(file, additionalData);
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = (e.loaded / e.total) * 100;
          onProgress(Math.round(progress));
        }
      });
      
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch {
            resolve(xhr.responseText);
          }
        } else {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      });
      
      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });
      
      xhr.open('POST', uploadUrl);
      xhr.send(formData);
    });
  },

  // Batch upload
  uploadBatch: async (
    files: File[],
    uploadUrl: string,
    onProgress?: (completed: number, total: number) => void,
    additionalData?: Record<string, any>
  ): Promise<any[]> => {
    const results: any[] = [];
    
    for (let i = 0; i < files.length; i++) {
      try {
        const result = await this.uploadWithProgress(files[i], uploadUrl, undefined, additionalData);
        results.push(result);
        onProgress?.(i + 1, files.length);
      } catch (error) {
        console.error(`Failed to upload file ${files[i].name}:`, error);
        results.push({ error: error.message });
      }
    }
    
    return results;
  }
};

// File download utilities
export const downloadUtils = {
  // Download file from URL
  downloadFromUrl: async (url: string, filename?: string): Promise<void> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename || 'download';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      throw new Error(`Failed to download file: ${error.message}`);
    }
  },

  // Download blob as file
  downloadBlob: (blob: Blob, filename: string): void => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(url);
  },

  // Download JSON as file
  downloadJSON: (data: any, filename: string = 'data.json'): void => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    this.downloadBlob(blob, filename);
  },

  // Download CSV as file
  downloadCSV: (data: any[], filename: string = 'data.csv'): void => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    this.downloadBlob(blob, filename);
  }
};

// File conversion utilities
export const conversionUtils = {
  // Convert file to base64
  toBase64: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        resolve(reader.result as string);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to convert file to base64'));
      };
      
      reader.readAsDataURL(file);
    });
  },

  // Convert base64 to file
  fromBase64: (base64: string, filename: string, mimeType: string): File => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], filename, { type: mimeType });
  },

  // Convert file to array buffer
  toArrayBuffer: (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        resolve(reader.result as ArrayBuffer);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to convert file to array buffer'));
      };
      
      reader.readAsArrayBuffer(file);
    });
  }
};

// File validation rules
export const fileRules = {
  image: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxDimensions: { width: 2048, height: 2048 }
  },
  
  document: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    maxDimensions: { width: 4096, height: 4096 }
  },
  
  avatar: {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['image/jpeg', 'image/png'],
    maxDimensions: { width: 512, height: 512 }
  },
  
  logo: {
    maxSize: 1 * 1024 * 1024, // 1MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/svg+xml'],
    maxDimensions: { width: 512, height: 512 }
  }
};

// File helper functions
export const fileHelpers = {
  validate: validateFile,
  formatSize: formatFileSize,
  getType: getFileType,
  getIcon: getFileIcon,
  image: imageUtils,
  upload: uploadUtils,
  download: downloadUtils,
  convert: conversionUtils,
  rules: fileRules
};
