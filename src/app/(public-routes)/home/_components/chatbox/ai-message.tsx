import Image from "../prompt/select-images/image";
import { formatMessage } from "./utils.";

type Props = {
  overview?: string;
  details?: { image: string; content: string }[];
};
export default function AIMessage({ overview, details }: Props) {
  return (
    <div className={`w-full flex flex-col justify-start py-5 my-5 gap-5`}>
      {Boolean(overview) && (
        <p className="text-sm">
          <span className="font-semibold text-lg">Overview:</span> {overview}
        </p>
      )}
      <>
        {details?.map((detail, index) => (
          <div
            key={index}
            className="mt-2 flex flex-row items-start gap-2 italic"
          >
            <Image src={detail.image} width={180} height={220} />
            <p className="text-sm flex-1 italic">
              {formatMessage(detail.content)}
            </p>
          </div>
        ))}
      </>
    </div>
  );
}
