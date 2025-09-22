import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function AddImage({
  width = 200,
  height = 240,
  onClick,
}: {
  width?: number;
  height?: number;
  onClick: () => void;
}) {
  return (
    <Card
      className="rounded-md p-1 shadow-none border-dashed"
      style={{ width, height }}
    >
      <Button
        className="bg-muted cursor-pointer w-full h-full"
        variant="ghost"
        onClick={onClick}
      >
        <Plus className="!w-10 !h-10" />
      </Button>
    </Card>
  );
}
