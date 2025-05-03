import { Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { useShare } from '@/hooks/useShare';

interface TwitterShareButtonProps {
  name: string;
  src: string;
}

export default function TwitterShareButton({ name, src }: TwitterShareButtonProps) {
  const { shareOnTwitter } = useShare();
  return (
    <Button
      className="bg-blue-500"
      onClick={() => {
        shareOnTwitter(name, src);
      }}
    >
      <Twitter className="mr-2" />
      Share on Twitter
    </Button>
  );
}
