import axios from "axios";

type AnalyzeImagesProps = { prompt: string, images: string[] }
export async function analyzeImages({ prompt, images }: AnalyzeImagesProps) {
    try {
        const res = await axios.post("/api/analyze", {
            prompt,
            images: images.map((item: string) => {
                const tmp = item.split(",");
                return { base64: tmp.pop(), mimeType: tmp.pop() || "image/jpeg" }
            }),
        });

        return res.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}
