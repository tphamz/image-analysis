import { createPromptAction } from "@/lib/actions/prompt.action";
import { NextRequest } from "next/server";

export function POST(request: NextRequest) {
    return createPromptAction(request);
}
