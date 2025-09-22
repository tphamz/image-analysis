import { Card } from "@/components/ui/card";
import Image from "../prompt/select-images/image";
import { formatMessage } from "./utils.";
type Props = {
  message: string;
  images: string[];
};
export default function UserMessage({ message, images }: Props) {
  return (
    <div className="w-full flex flex-row justify-end my-5">
      <Card className="rounded-md shadow-none bg-muted/50 min-w-[20%] max-w-[90%] lg:max-w-[80%] flex flex-row py-3 px-2 border-0">
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            {images.map((img, index) => (
              <Image key={index} src={img} width={65} height={80} />
            ))}
          </div>
          <p className="text-sm mt-3">{formatMessage(message)}</p>
        </div>
      </Card>
    </div>
  );
}
