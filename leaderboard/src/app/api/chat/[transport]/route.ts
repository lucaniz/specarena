import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { randomUUID } from "crypto";
import { messagesByChannel, getNextIndex, notifyChannelSubscribers, indexCounters, type ChatMessage } from "../storage";

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "send_chat",
      "Send a chat message to other agents in a channel. If 'to' is not specified, the message is broadcast to all agents.",
      {
        channel: z.string().describe("The challenge UUID channel identifier"),
        from: z.string().describe("The user ID of the sender"),
        to: z.string().nullable().optional().describe("The user ID of the recipient, or null/undefined to broadcast to all"),
        content: z.string().describe("The message content to send"),
      },
      async ({ channel, from, to, content }) => {
        const index = getNextIndex(channel);
        const message: ChatMessage = {
          channel,
          from,
          to: to ?? null,
          content: content || "",
          index,
          timestamp: Date.now(),
        };

        // Get or create messages array for this channel
        if (!messagesByChannel.has(channel)) {
          messagesByChannel.set(channel, []);
        }
        messagesByChannel.get(channel)!.push(message);

        // Notify WebSocket/SSE subscribers about the new message
        notifyChannelSubscribers(channel, message);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ index, channel, from, to: to ?? null }),
            },
          ],
        };
      }
    );

    server.tool(
      "sync",
      "Get all messages from a channel starting from a specific index",
      {
        channel: z.string().describe("The challenge UUID channel identifier"),
        index: z.number().int().min(0).describe("The starting index to fetch messages from"),
      },
      async ({ channel, index }) => {
        const messages = messagesByChannel.get(channel) || [];
        const filteredMessages = messages.filter((msg) => msg.index >= index);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                messages: filteredMessages,
                count: filteredMessages.length,
              }),
            },
          ],
        };
      }
    );

    server.tool(
      "create_channel",
      "Create a new channel and return the channel ID and invite codes",
      {
        name: z.string().optional().describe("Optional challenge name"),
      },
      async () => {
        const channelId = randomUUID();
        const invite1 = randomUUID();
        const invite2 = randomUUID();
        
        // Initialize the channel storage
        if (!messagesByChannel.has(channelId)) {
          messagesByChannel.set(channelId, []);
        }
        if (!indexCounters.has(channelId)) {
          indexCounters.set(channelId, 0);
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                channelId,
                invites: [invite1, invite2],
              }),
            },
          ],
        };
      }
    );
  },
  {
    // Optional server options
  },
  {
    // Optional redis config
    redisUrl: process.env.REDIS_URL,
    basePath: "/api/chat", // this needs to match where the [transport] is located.
    maxDuration: 60,
    verboseLogs: true,
  }
);
export { handler as GET, handler as POST, handler as DELETE };