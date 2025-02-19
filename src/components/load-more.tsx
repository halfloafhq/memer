'use client';
import { Meme } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spinner } from './loaders/spinner';
import { getMemes } from '@/app/_actions';
import Memes from './memes/memes';

export default function LoadMore() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState<number>(1);
  const [showSpinner, setShowSpinner] = useState<boolean>(true);

  const { ref, inView } = useInView();

  const loadMoreMemes = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500)); //Delay to not spam the API
    const nextPage = pagesLoaded + 1;
    const newMemes = await getMemes(pagesLoaded);
    if (newMemes.length === 0) {
      setShowSpinner(false);
    } else {
      setShowSpinner(true);
    }
    setMemes((prev) => [...prev, ...newMemes]);
    setPagesLoaded(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreMemes();
    }
  }, [inView]);

  return (
    <>
      <Memes memes={memes} />
      <div className="flex flex-col items-center justify-center w-full" ref={ref}>
        {showSpinner && <Spinner />}
      </div>
    </>
  );
}
