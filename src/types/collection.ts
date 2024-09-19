import { Collection, Meme, MemeCollection } from "@prisma/client";
import { AppState, BinaryFiles } from "@excalidraw/excalidraw/types/types";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";

export type CollectionWithMemes = Collection & {
  memes: (MemeCollection & {
    meme: Meme
  })[];
};

export interface EditorData {
  elements: readonly ExcalidrawElement[];
  appState: AppState;
  files: BinaryFiles;
  scrollToContent: boolean;
}

