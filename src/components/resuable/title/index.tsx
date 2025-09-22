"use client";

import { useRef } from "react";
import * as animations from "../animations";
export function Title({ children }: { children: React.ReactNode }) {
  return (
    <animations.Appear>
      <h4 className="text-4xl font-semibold text-center">{children}</h4>
    </animations.Appear>
  );
}

export function Subtitle({ children }: { children: React.ReactNode }) {
  return (
    <animations.Appear options={{ duration: 1, delay: 1 }}>
      <h5 className="text-xl text-center text-muted-foreground">{children}</h5>
    </animations.Appear>
  );
}
