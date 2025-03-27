'use client';
import React from 'react';
import MemeCard from './meme-card';
import { Meme } from '@prisma/client';
import { motion } from 'motion/react';

interface MemesProps {
  memes: Meme[];
}

export default function Memes({ memes }: MemesProps) {
  return memes.map((meme: Meme, idx: number) => (
    <motion.div
      key={meme.id}
      initial={{
        y: 25,
      }}
      animate={{
        y: 0,
        transition: { duration: 0.4 + idx },
      }}
      whileHover={{ scale: 1.1 }}
    >
      <MemeCard src={meme.url} name={meme.name} description={meme.description} memeId={meme.id} />
    </motion.div>
  ));
}
