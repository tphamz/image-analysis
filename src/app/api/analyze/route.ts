import { createPromptAction } from "@/lib/actions/prompt.action";
import { NextRequest } from "next/server";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb', // adjust to your needs
        },
    },
};

export function POST(request: NextRequest) {
    return createPromptAction(request);
}
