import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

interface UploadFileVariables {
  file: File;
  config?: any;
}

interface UploadMultiFilesVariables {
  files: File[];
}

interface BunnyUploadResponse {
  url: string;
  fileId: string;
  fileName: string;
  size: number;
  contentType: string;
}

type UploadSuccessCallback = (data: BunnyUploadResponse | BunnyUploadResponse[], variables: UploadFileVariables | UploadMultiFilesVariables, context?: any) => void;
type UploadErrorCallback = (error: any, variables: UploadFileVariables | UploadMultiFilesVariables, context?: any) => void;

// Bunny.net upload function
async function uploadToBunny(
  file: File,
  storageZone: string,
  accessKey: string,
  onProgress?: (progress: number) => void
): Promise<BunnyUploadResponse> {
  const fileName = `${Date.now()}-${file.name}`;
  const uploadUrl = `https://${storageZone}.bunnycdn.com/${fileName}`;
  
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'AccessKey': accessKey,
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const publicUrl = `https://${storageZone}.bunnycdn.com/${fileName}`;
    
    return {
      url: publicUrl,
      fileId: fileName,
      fileName: file.name,
      size: file.size,
      contentType: file.type,
    };
  } catch (error) {
    throw new Error(`Upload failed: ${error}`);
  }
}

export const useUploadSingleFile = (
  onSuccess?: UploadSuccessCallback,
  onError?: UploadErrorCallback
): UseMutationResult<BunnyUploadResponse, Error, UploadFileVariables> => {
  const { bunnyStorageZone, bunnyAccessKey } = useSelector((state: any) => state.settings);
  
  return useMutation({
    mutationFn: async ({ file, config }: UploadFileVariables) => {
      if (!bunnyStorageZone || !bunnyAccessKey) {
        throw new Error('Bunny.net configuration missing');
      }
      
      return uploadToBunny(file, bunnyStorageZone, bunnyAccessKey, config?.onProgress);
    },
    onSuccess: (data, variables, context) => {
      onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      onError?.(error, variables, context);
    }
  });
};

export const useUploadMultiFiles = (
  onSuccess?: UploadSuccessCallback,
  onError?: UploadErrorCallback
): UseMutationResult<BunnyUploadResponse[], Error, UploadMultiFilesVariables> => {
  const { bunnyStorageZone, bunnyAccessKey } = useSelector((state: any) => state.settings);
  
  return useMutation({
    mutationFn: async ({ files }: UploadMultiFilesVariables) => {
      if (!bunnyStorageZone || !bunnyAccessKey) {
        throw new Error('Bunny.net configuration missing');
      }
      
      const uploads = files.map((file) => 
        uploadToBunny(file, bunnyStorageZone, bunnyAccessKey)
      );
      
      return Promise.all(uploads);
    },
    onSuccess: (results, variables, context) => {
      onSuccess?.(results, variables, context);
    },
    onError: (error, variables, context) => {
      onError?.(error, variables, context);
    }
  });
};
