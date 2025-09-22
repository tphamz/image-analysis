import { create } from "zustand";
import { toast } from "sonner";
import { toJPEG } from "../utils";

const MAX_SIZE = parseInt(process.env.NEXT_PUBLIC_MAX_IMAGES || "4");

type Props = {
  prompt: string;
  images: string[];
  setPrompt: (value: string) => void;
  addImages: (file: File[]) => Promise<void>;
  removeImage: (index: number) => void;
  reset: () => void;
};

export const usePrompt = create<Props>((set, get) => ({
  prompt: "",
  images: [],
  setPrompt: (prompt: string) => set((state) => ({ ...state, prompt })),
  addImages: async (files: File[]) => {
    try {
      const state = get();
      if (MAX_SIZE - state.images.length <= 0) return;
      toast.dismiss();
      let i: number = 0;
      for (const file of files) {
        if (i++ >= Math.min(files.length, MAX_SIZE - state.images.length))
          break;
        const compressedImage = await toJPEG(file, 0.6);
        state.images.push(compressedImage);
      }
      set({ ...state });
    } catch (error) {
      toast(<div className="text-red-500">{(error as Error).message}</div>);
    }
  },
  removeImage: (index: number) =>
    set((state) => ({
      ...state,
      images: state.images.filter((_, i) => i !== index),
    })),
  reset: () => set({ prompt: "", images: [] }),
}));
