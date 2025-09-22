"use client";
import { Card } from "@/components/ui/card";
import { useRef } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

export default function Image({
  src,
  width = 200,
  height = 240,
  onDelete,
}: {
  src: string | Blob;
  width?: number;
  height?: number;
  onDelete?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseEnter = () => {
    if (!onDelete) return;
    ref.current?.classList.add("neon-card");
    gsap.to(ref.current, {
      rotate: -2,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const onMouseLeave = () => {
    if (!onDelete) return;
    ref.current?.classList.remove("neon-card");
    gsap.to(ref.current, {
      rotate: 0,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  return (
    <Card
      className="rounded-md p-2 relative"
      style={{ width, height }}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-row justify-center items-center w-full h-full">
        <img
          src={typeof src === "string" ? src : URL.createObjectURL(src)}
          className="object-cover rounded-md w-full h-full"
        />
      </div>
      <>
        {Boolean(onDelete) && (
          <>
            <div className="absolute top-0 left-0 bg-black rounded-md w-full h-full opacity-0 lg:hover:opacity-80 transition-opacity duration-300 flex flex-row justify-center items-center gap-5">
              <X
                className="w-10 h-10 cursor-pointer hidden lg:block"
                color="white"
                onClick={onDelete}
              />
            </div>

            <div className="absolute top-[-8] right-[-8] bg-accent rounded-full w-5 h-5 lg:opacity-0 opacity-100 flex flex-row justify-center items-center gap-5">
              <X
                className="w-4 h-4 cursor-pointer lg:hidden block"
                onClick={onDelete}
              />
            </div>
          </>
        )}
      </>
    </Card>
  );
}
