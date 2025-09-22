"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

type Props = React.ComponentProps<"div"> & {
  children?: React.ReactNode;
  options?: {
    duration?: number;
    ease?: string;
    delay?: number;
    repeat?: number;
    repeatDelay?: number;
  };
};
export function FadeSlide({ children, options = {}, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(async () => {
    if (ref && "current" in ref && ref.current) {
      gsap.from(ref.current, {
        opacity: 0,
        y: 50,
        duration: options.duration || 1,
        ease: options.ease || "power2.out",
        delay: options.delay || 0,
        repeat: options.repeat || 0,
        repeatDelay: options.repeatDelay || 1,
      });
    }
  });
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}
