"use client";
import { useChat } from "@/lib/stores/use-chat";
import UserMessage from "./user-message";
import AIMessage from "./ai-message";
import animations from "@/components/resuable/animations";
import React, { useEffect } from "react";
import Image from "next/image";

export default function Chatbox() {
  const { messages, loading } = useChat();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.querySelector("#loading-message")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [loading]);

  return (
    <div ref={scrollRef} className="w-full h-full overflow-y-auto py-2">
      {Boolean(!messages.length) && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <animations.Scramble className="text-md text-center">
            Select images, provide details
          </animations.Scramble>

          <animations.Scramble
            className="text-md text-center"
            options={{ duration: 1 }}
          >
            Let AI do the thinking 🤖✨
          </animations.Scramble>
        </div>
      )}
      {messages.map((content, index) => (
        <React.Fragment key={index}>
          {content.type === "user" && (
            <UserMessage
              message={content.message.prompt}
              images={content.message.images as string[]}
            />
          )}
          {content.type === "ai" && (
            <AIMessage
              overview={content.message.overview}
              details={content.message.details}
            />
          )}
        </React.Fragment>
      ))}
      {loading && (
        <div
          className="w-full flex flex-row items-center border-t-solid border-t-[0.5] border-t-amber/50 py-5 my-5"
          id="loading-message"
        >
          <Image
            src="/image_loading.gif"
            alt="loading"
            width={60}
            height={80}
            className="object-contain"
          />
          <animations.Appear options={{ repeat: -1, repeatDelay: 0.3 }}>
            Analyzing images...
          </animations.Appear>
        </div>
      )}
    </div>
  );
}
