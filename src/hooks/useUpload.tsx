import { useState, useCallback } from 'react';

export function useUpload() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateFileUrl = useCallback((url: string | null) => {
    setFileUrl(url);
    setSuccess(!!url);
  }, []);

  return {
    fileUrl,
    fileKey,
    setFileKey,
    setFileUrl: updateFileUrl,
    success,
    setSuccess,
  };
}
