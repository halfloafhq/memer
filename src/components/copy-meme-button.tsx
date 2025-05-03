import { convertJpgToPng, copyImageToClipboard } from '@/utils/image';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface CopyMemeButtonProps {
  src: string;
}

export default function CopyMemeButton({ src }: CopyMemeButtonProps) {
  const { toast } = useToast();
  const handleClick = async () => {
    try {
      convertJpgToPng(src, copyImageToClipboard);
      toast({
        title: 'Copied meme to clipboard!',
      });
    } catch (error) {
      toast({
        title: 'Uh oh!',
        description: error instanceof Error ? error.message : 'Failed to copy meme to clipboard',
        variant: 'destructive',
      });
    }
  };
  return <Button onClick={handleClick}>Copy to Clipboard</Button>;
}
