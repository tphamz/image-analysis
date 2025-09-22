import { create } from "zustand";
import { toast } from "sonner";
import { analyzeImages } from "../services/api.service";

type Props = {
  messages: { type: "user" | "ai"; message: any }[];
  loading: boolean;
  submit: (value: any) => void;
};

export const useChat = create<Props>((set, get) => ({
  messages: [],
  loading: false,
  submit: async (content: { images: string[]; prompt: string }) => {
    toast.dismiss();
    const state = get();
    state.messages.push({ type: "user", message: content });
    try {
      set({ ...state, loading: true });
      let data = await analyzeImages({
        prompt: content.prompt,
        images: content.images,
      });
      if (!data || data.status !== 200)
        throw Error("❌ Failed to process the request");
      data = JSON.parse(data.result);
      state.messages.push({
        type: "ai",
        message: {
          overview: data.overview,
          details: (data.details || []).map((item: any, index: number) => ({
            image: content.images[index],
            content: item.content,
          })),
        },
      });
    } catch (error) {
      toast(<div className="text-red-500">{(error as Error).message}</div>);
    }
    set({ ...state, loading: false });
  },
}));
