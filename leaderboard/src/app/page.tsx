"use client";

import { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";

// Mock leaderboard data
const mockData = [
  { name: "Alpha", securityPolicy: 85, utility: 92 },
  { name: "Beta", securityPolicy: 78, utility: 88 },
  { name: "Gamma", securityPolicy: 92, utility: 75 },
  { name: "Delta", securityPolicy: 65, utility: 95 },
  { name: "Epsilon", securityPolicy: 88, utility: 82 },
  { name: "Zeta", securityPolicy: 72, utility: 90 },
  { name: "Eta", securityPolicy: 95, utility: 70 },
  { name: "Theta", securityPolicy: 60, utility: 85 },
  { name: "Iota", securityPolicy: 82, utility: 88 },
  { name: "Kappa", securityPolicy: 75, utility: 80 },
  { name: "Lambda", securityPolicy: 90, utility: 85 },
  { name: "Mu", securityPolicy: 68, utility: 92 },
  { name: "Nu", securityPolicy: 80, utility: 78 },
  { name: "Xi", securityPolicy: 55, utility: 88 },
  { name: "Omicron", securityPolicy: 88, utility: 90 },
];

export default function Home() {
  const plotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = plotRef.current;
    if (!container) return;

    // Clear any existing content first
    container.innerHTML = "";

    const chart = Plot.plot({
      width: 800,
      height: 400,
      grid: true,
      style: {
        color: "#18181b",
      },
      x: {
        label: "Security Policy",
        domain: [40, 100],
        ticks: 10,
      },
      y: {
        label: "Utility",
        domain: [40, 100],
        ticks: 5,
      },
      marks: [
        Plot.dot(mockData, {
          x: "securityPolicy",
          y: "utility",
          fill: "steelblue",
          r: 4,
          tip: {
            format: {
              title: (d) => d.name,
              x: (d) => `Security Policy: ${d}`,
              y: (d) => `Utility: ${d}`,
            },
          },
        }),
        Plot.text(mockData, {
          x: "securityPolicy",
          y: "utility",
          text: "name",
          dx: 0,
          dy: -10,
          fontSize: 10,
          fill: "#18181b",
          textAnchor: "middle",
        }),
      ],
    });

    container.appendChild(chart);

    // Style the chart to ensure axis labels and ticks are visible
    const svg = container.querySelector("svg");
    if (svg) {
      // Style all text elements (axis labels and tick labels)
      const textElements = svg.querySelectorAll("text");
      textElements.forEach((text) => {
        (text as SVGTextElement).setAttribute("fill", "#18181b");
      });
      // Style all line elements (grid lines and axis lines)
      const lineElements = svg.querySelectorAll("line");
      lineElements.forEach((line) => {
        const stroke = (line as SVGLineElement).getAttribute("stroke");
        if (stroke && (stroke === "currentColor" || stroke === "white" || !stroke)) {
          (line as SVGLineElement).setAttribute("stroke", "#e4e4e7");
        }
      });
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      {/* Header with Logo */}
      <header className="w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center px-3">
                <span className="text-white font-semibold text-medium" style={{ fontFamily: 'var(--font-jost), sans-serif' }}>
                  AR
                  <span className="text-white text-[12px] mb-10 relative top-[-4px] left-[2px]">E</span>
                  <span className="text-white text-[11px] font-bold relative top-[5px] left-[-2px]">N</span>
                  A
                </span>
              </div>
              <nav className="flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">
                Games
              </a>
              <a href="#" className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">
                Docs
              </a>
            </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        {/* Leaderboard Graph */}
        <div className="max-w-4xl mx-auto border border-zinc-200 p-8">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-6">
            Performance Matrix
          </h2>
          <div className="flex justify-center overflow-x-auto">
            <div ref={plotRef} className="plot-container" />
          </div>
        </div>
      </section>
    </div>
  );
}
