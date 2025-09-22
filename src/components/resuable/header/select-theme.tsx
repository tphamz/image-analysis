"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

enum THEMES {
  LIGHT = "light",
  DARK = "dark",
}
export default function SelectTheme() {
  const { theme, setTheme } = useTheme();
  return (
    <Select value={theme || THEMES.DARK} onValueChange={setTheme}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={THEMES.LIGHT} className="flex flex-row">
          <Sun className="w-4 h-4" />
          <div className="text-sm capitalize">{THEMES.LIGHT}</div>
        </SelectItem>
        <SelectItem value={THEMES.DARK} className="flex flex-row">
          <Moon className="w-4 h-4" />
          <div className="text-sm capitalize">{THEMES.DARK}</div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
