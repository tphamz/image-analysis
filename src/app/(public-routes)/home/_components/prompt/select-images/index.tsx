import { Button } from "@/components/ui/button";
import AddImage from "./add-image";
import Image from "./image";
import { Image as ImageIcon } from "lucide-react";
import { DragEventHandler, useRef, useState } from "react";
type Props = React.ComponentProps<"div"> & {
  images: Array<string | Blob>;
  onAdd: (images: File[]) => void;
  onRemove: (index: number) => void;
  imageWidth?: number;
  imageHeight?: number;
  maxImages?: number;
};
export default function SelectImages({
  images,
  imageWidth = 200,
  imageHeight = 240,
  maxImages = 0,
  className = "",
  onAdd,
  onRemove,
  ...rest
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(Array.from(e.dataTransfer.files));
  };

  const handleFileChange = (files: File[]) => {
    if (files.length) onAdd(files);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-full rounded-md border-dashed border-gray-10 flex flex-row flex-wrap items-center gap-2 p-2 bg-blue-400/5 border-2
        ${isDragging ? "dark:border-white border-blue-500" : "border-gray-10"}
        ${className}`}
      style={{ minHeight: imageHeight + 10 }}
      {...rest}
    >
      {images.map((image: string | Blob, index: number) => (
        <Image
          key={index}
          src={image}
          width={imageWidth}
          height={imageHeight}
          onDelete={() => onRemove(index)}
        />
      ))}
      {Boolean(images.length) && maxImages > images.length && (
        <AddImage
          width={imageWidth}
          height={imageHeight}
          onClick={handleClick}
        />
      )}

      {!Boolean(images.length) && (
        <div className="w-full h-full flex flex-row justify-center items-center">
          <Button
            variant="link"
            className="cursor-pointer"
            onClick={handleClick}
          >
            <ImageIcon /> <span>Click to Select an Image</span>
          </Button>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) =>
          handleFileChange(e.target.files ? Array.from(e.target.files) : [])
        }
        accept="image/*"
        multiple
      />
    </div>
  );
}
