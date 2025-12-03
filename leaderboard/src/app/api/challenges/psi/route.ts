import { NextRequest, NextResponse } from "next/server";
import { createChallenge } from "../storage";

export async function POST() {
  try {
    const name = "psi";
    // Verify that the challenge type exists in challenges.json
    const challenge = createChallenge(name);

    // Return the challenge ID and any invites (empty for now)
    return NextResponse.json(challenge);
  } catch (error) {
    console.error("Error creating challenge:", error);
    return NextResponse.json(
      { error: "Failed to create challenge" },
      { status: 500 }
    );
  }
}

