"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

type CrispWidgetProps = {
  websiteId: string;
  label?: string;
};

export default function CrispWidget({ websiteId, label = "Live chat" }: CrispWidgetProps) {
  const [ready, setReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize Crisp queue early
    window.$crisp = window.$crisp || [];
    window.CRISP_WEBSITE_ID = websiteId;

    // Prevent duplicate script injection
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://client.crisp.chat/l.js"]'
    );
    
    if (!existing) {
      const s = document.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      s.onload = () => {
        configureCrisp();
        setReady(true);
      };
      document.head.appendChild(s);
    } else {
      configureCrisp();
      setReady(true);
    }
  }, [websiteId]);

  const configureCrisp = () => {
    try {
      // Hide default Crisp bubble completely
      window.$crisp.push(["do", "chat:hide"]);
      
      // Remove the default floating button that appears after closing
      window.$crisp.push(["config", "hide:on:away", false]);
      window.$crisp.push(["config", "hide:on:mobile", false]);
      
      // Listen for chat close events to ensure button stays hidden
      window.$crisp.push([
        "on",
        "chat:closed",
        () => {
          window.$crisp.push(["do", "chat:hide"]);
        },
      ]);

      // Move close button to top-right inside modal (using custom CSS)
      const style = document.createElement("style");
      style.textContent = `
        /* Move Crisp close button to top-right of modal */
        .crisp-client .cc-tlyw .cc-1xry .cc-unoo {
          top: 12px !important;
          right: 12px !important;
          bottom: auto !important;
          left: auto !important;
        }
        
        /* Ensure the close button stays inside the chat window */
        .crisp-client .cc-tlyw {
          position: relative !important;
        }
        
        /* Hide any floating button that Crisp creates after closing */
        .crisp-client .cc-1xry.cc-unoo:not(.cc-nxnw) {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    } catch (e) {
      console.error("Error configuring Crisp:", e);
    }
  };

  const openChat = () => {
    try {
      window.$crisp.push(["do", "chat:show"]);
      window.$crisp.push(["do", "chat:open"]);
    } catch (e) {
      console.error("Error opening chat:", e);
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-6 right-24 z-50 flex flex-col items-end gap-3">
      {/* Label tooltip - only shows on hover */}
      <div
        className={`pointer-events-auto origin-bottom-right transform transition-all duration-300 ease-out ${
          isHovered ? 'opacity-100 translate-y-0 scale-100' : 'translate-y-2 opacity-0 scale-95'
        }`}
      >
        <span className="inline-flex max-w-xs items-center rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-slate-900 shadow-lg ring-1 ring-slate-200 backdrop-blur-sm">
          {label}
        </span>
      </div>

      {/* Floating Button */}
      <button
        type="button"
        onClick={openChat}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        disabled={!ready}
        className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl transition-all duration-300 ease-out hover:scale-110 hover:shadow-[0_8px_30px_rgba(15,23,42,0.4)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300 active:scale-95 disabled:opacity-60"
        aria-label="Open live chat"
      >
        {/* Simple chat icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-8 w-8"
          aria-hidden="true"
        >
          <path d="M20 2H4a2 2 0 00-2 2v16l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
        </svg>
      </button>
    </div>
  );
}