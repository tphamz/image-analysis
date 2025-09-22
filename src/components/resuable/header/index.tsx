import SelectTheme from "./select-theme";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function Header({ children }: Props) {
  return (
    <header className="fixed w-full z-[10] top-0 shrink-0 flex flex-wrap items-center justify-between gap-2 p-4 bg-background !rounded-tl-4xl border-b-[0.5px] border-b-accent">
      <div>{children}</div>
      <div className="flex flex-row justify-center items-center gap-3">
        <SelectTheme />
      </div>
    </header>
  );
}
