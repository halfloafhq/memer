export function useShare() {
  const shareOnTwitter = (text: string, url: string) => {
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

    window.open(intentUrl, '_blank');
  };

  return {
    shareOnTwitter,
  };
}
