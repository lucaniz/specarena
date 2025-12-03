"use client";

import { useState } from "react";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

interface CopyableInviteProps {
  invite: string;
  copyText?: string;
  className?: string;
}

export default function CopyableInvite({ invite, copyText = invite, className }: CopyableInviteProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div 
      onClick={handleCopy}
      className={className}
    >
      <span className="select-all">{invite.trim()}</span>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        {copied ? (
          <CheckIcon className="w-4 h-4 text-green-600" />
        ) : (
          <ClipboardDocumentIcon className="w-4 h-4" />
        )}
      </span>
    </div>
  );
}

