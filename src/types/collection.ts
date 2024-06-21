import { Collection, Meme, MemeCollection } from "@prisma/client";

export type CollectionWithMemes = Collection & {
  memes: (MemeCollection & {
    meme: Meme
  })[];
};
