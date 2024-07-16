export async function downloadMeme(src: string, name: string) {
  const response = await fetch(src);
  if (!response.ok) {
    return false;
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${name}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
  return true;
}
