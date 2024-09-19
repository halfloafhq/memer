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
