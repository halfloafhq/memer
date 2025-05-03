export async function urlToDataUrl(fileUrl: string): Promise<string> {
  try {
    // Fetch the file
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the content type
    const contentType = response.headers.get('Content-Type') || 'application/octet-stream';

    // Get the file content as a Blob
    const blob = await response.blob();

    // Create a FileReader to read the Blob as a data URL
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting URL to data URL:', error);
    throw error;
  }
}

export async function copyImageToClipboard(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);
    const blob = await res.blob();

    const item = new ClipboardItem({
      [blob.type]: blob,
    });

    await navigator.clipboard.write([item]);
  } catch (error) {
    console.error('Error copying image to clipboard:', error);
    throw error;
  }
}

export function convertJpgToPng(jpgUrl: string, callback: (pngUrl: string) => Promise<void>) {
  var img = new Image();

  // To handle CORS issue
  img.crossOrigin = "anonymous"

  img.onload = async function () {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Could not get context');

    ctx.drawImage(img, 0, 0);

    // Convert the image to PNG format
    var pngDataUrl = canvas.toDataURL('image/png');

    // Pass the converted PNG URL to the callback function
    await callback(pngDataUrl);
  };

  img.src = jpgUrl;
}
