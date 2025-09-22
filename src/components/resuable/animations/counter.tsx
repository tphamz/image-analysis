"use client";
import { useGSAP } from "@gsap/react";
import { gsap, Power1 } from "gsap";
import { useEffect, useRef } from "react";

type Props = React.ComponentProps<"div"> & {
  from?: number;
  to: number;
  options?: {
    duration?: number;
    ease?: string;
    delay?: number;
  };
};
export function Counter({ from = 0, to, options = {}, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      duration: options.duration || 4,
      delay: options.delay || 0,
      textContent: to.toString(),
      roundProps: "textContent",
      ease: Power1.easeIn,
    });
  });
  return (
    <div ref={ref} {...rest}>
      {from}
    </div>
  );
}
