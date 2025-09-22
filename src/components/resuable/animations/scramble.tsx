"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SplitText } from "gsap/all";

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
export function Scramble({ children, options = {}, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.registerPlugin(SplitText);
    if (ref && "current" in ref && ref.current) {
      const headlineSplit = SplitText.create(ref.current, {
        type: "words",
        wordsClass: "word++",
        ignore: "sup",
      });

      gsap.from(headlineSplit.words, {
        y: -100,
        opacity: 0,
        rotation: "random(-80, 80)",
        stagger: 0.1,
        duration: 1,
        ease: "back",
        background: "transparent",
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
