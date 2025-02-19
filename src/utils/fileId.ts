import { FileId } from '@excalidraw/excalidraw/types/element/types';
import { nanoid } from 'nanoid';

export const generateIdFromFile = async (file: File): Promise<FileId> => {
  try {
    const hashBuffer = await window.crypto.subtle.digest('SHA-1', await blobToArrayBuffer(file));
    return bytesToHexString(new Uint8Array(hashBuffer)) as FileId;
  } catch (error: any) {
    console.error(error);
    // length 40 to align with the HEX length of SHA-1 (which is 160 bit)
    return nanoid(40) as FileId;
  }
};

export const blobToArrayBuffer = (blob: Blob): Promise<ArrayBuffer> => {
  if ('arrayBuffer' in blob) {
    return blob.arrayBuffer();
  }
  // Safari
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) {
        return reject(new Error("Couldn't convert blob to ArrayBuffer"));
      }
      resolve(event.target.result as ArrayBuffer);
    };
    reader.readAsArrayBuffer(blob);
  });
};

export const bytesToHexString = (bytes: Uint8Array) => {
  return Array.from(bytes)
    .map((byte) => `0${byte.toString(16)}`.slice(-2))
    .join('');
};
