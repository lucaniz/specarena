import { NextRequest, NextResponse } from "next/server";
import { getMessagesForChannel } from "../../storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await params;
  const messages = getMessagesForChannel(uuid);
  
  return NextResponse.json({
    channel: uuid,
    messages,
    count: messages.length,
  });
}

