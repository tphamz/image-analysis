import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function isValidImage(file: File): boolean {
  const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml", "image/jpg", "image/heic", "image/heif", "image/avif"];
  return validImageTypes.includes(file.type);
}

export function dataURLtoBase64(dataUrl: string): Blob {
  const arr: string[] = dataUrl.split(",");
  const mime = (arr[0].match(/:(.*?);/) || [])[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new Blob([u8arr], { type: mime });
}

export function toJPEG(file: File, maxSizeMB = 0.5): Promise<string> {
  if (!isValidImage(file))
    return Promise.reject(new Error("❌ Invalid image format! Accepted formats are JPEG, PNG, GIF, WEBP, SVG."));
  return new Promise((resolve, reject) => {
    const MAX_SIZE = maxSizeMB * 1024 * 1024;
    if (file.size > MAX_SIZE)
      return reject(new Error("❌ File is too large! Must be under " + maxSizeMB + " MB."));

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!ctx) return reject(new Error("❌ Could not get canvas context."));
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        let quality = 0.9; // start with high quality
        let jpegDataUrl = canvas.toDataURL("image/jpeg", quality);

        // Reduce quality until under max size
        // Approximate factor of 1.37 for base64 encoding overhead
        while (jpegDataUrl.length > MAX_SIZE * 1.37 && quality > 0.1) {
          quality -= 0.1;
          jpegDataUrl = canvas.toDataURL("image/jpeg", quality);
        }
        resolve(jpegDataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error("❌ Failed to read image file."));
    reader.readAsDataURL(file);
  });
}

export const scrollToBottom = (element: HTMLElement) => {
  element.scrollTo({
    top: element.scrollHeight,
    behavior: "smooth"
  });
}