'use client';
import React from 'react';
import MemeCard from './meme-card';
import { Meme } from '@prisma/client';

interface MemesProps {
  memes: Meme[];
}

export default function Memes({ memes }: MemesProps) {
  return memes.map((meme: Meme) => (
    <div key={meme.id}>
      <MemeCard src={meme.url} name={meme.name} description={meme.description} memeId={meme.id} />
    </div>
  ));
}
