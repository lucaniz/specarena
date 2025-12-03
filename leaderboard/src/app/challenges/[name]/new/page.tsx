"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function NewChallengePage() {
  const router = useRouter();
  const params = useParams();
  const name = params.name as string;

  useEffect(() => {
    const uuid = crypto.randomUUID();
    router.replace(`/challenges/${name}/${uuid}`);
  }, [router, name]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white flex items-center justify-center">
      <div className="text-zinc-900">Redirecting...</div>
    </div>
  );
}

