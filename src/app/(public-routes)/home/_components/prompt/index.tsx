"use client";
import { Textarea } from "@/components/ui/textarea";
import animations from "../../../../../components/resuable/animations";
import SelectImages from "./select-images";
import { Button } from "@/components/ui/button";
import { Command, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePrompt } from "@/lib/stores/use-prompt";
import { toast } from "sonner";
import { useChat } from "@/lib/stores/use-chat";

type Props = React.ComponentProps<"div"> & {
  maxImages?: number;
};
export default function Prompt({ maxImages = 0, ...rest }: Props) {
  const { images, prompt, setPrompt, addImages, removeImage, reset } =
    usePrompt();
  const { loading, submit } = useChat();
  const [isMac, setIsMac] = useState(false);

  const handleSubmit = async () => {
    toast.dismiss();
    if (!prompt.trim() || images.length === 0)
      return toast(
        <div className="text-red-500">
          ⚠️ Please add a prompt and at least one image
        </div>
      );

    submit({ images, prompt });
    reset();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      (isMac && e.metaKey && e.key === "Enter") ||
      (!isMac && e.ctrlKey && e.key === "Enter")
    ) {
      e.preventDefault();
      console.log("Submit", { prompt, images });
      handleSubmit();
    }
  };

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(
        navigator.userAgent.includes("Macintosh") ||
          navigator.userAgent.includes("Mac OS X")
      );
    }
  }, []);

  return (
    <animations.Stagger
      options={{ delay: 0, duration: 0.5 }}
      className={
        "relative flex flex-col justify-between items-center rounded-xl bg-muted w-full p-6 " +
        rest.className
      }
    >
      <SelectImages
        images={images}
        onAdd={addImages}
        onRemove={removeImage}
        maxImages={maxImages}
        imageHeight={80}
        imageWidth={60}
        className="mb-2"
      />
      <Textarea
        autoFocus
        placeholder="Ask anything..."
        className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 !bg-transparent flex-grow min-h-12 max-h-[200px] resize-none mt-2"
        rows={15}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex flex-row justify-end items-center gap-2 w-full">
        <Button
          size="sm"
          disabled={loading}
          className="rounded-full justify-between !p-1 h-10 bg-primary/75"
          onClick={handleSubmit}
        >
          <span className="flex flex-row gap-0 items-center justify-center ml-2">
            {isMac ? <Command /> : "Ctrl"}
            <> + Enter</>
          </span>

          <span className="rounded-full p-2 bg-primary">
            <Send />
          </span>
        </Button>
      </div>
      <>{loading && <div className="absolute w-full h-full top-0 left-0" />}</>
    </animations.Stagger>
  );
}
