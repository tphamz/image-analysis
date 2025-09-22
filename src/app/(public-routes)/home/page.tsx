"use client";
import Prompt from "@/app/(public-routes)/home/_components/prompt";
import Chatbox from "./_components/chatbox";
import { useChat } from "@/lib/stores/use-chat";
export default function Home() {
  const { messages } = useChat();
  return (
    <div className="w-full h-full min-h-[80vh] flex flex-col justify-center">
      <div className="relative w-full h-full justify-center items-center flex flex-col px-2 py-5">
        <div
          className="w-full pb-[100px] lg:pb-[400px]"
          style={{ paddingBottom: messages.length ? "400px" : "0px" }}
        >
          <Chatbox />
        </div>
      </div>
      <div
        className={`w-full ${
          messages.length ? "fixed" : "relative"
        } bottom-0 left-0 prompt-container z-10 pb-2 p-2`}
      >
        <Prompt className="max-w-6xl mx-auto" />
      </div>
    </div>
  );
}
