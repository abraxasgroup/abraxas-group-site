"use client";

import React from "react";

/**
 * CyberCard is a reusable 3D interactive card component. It uses a set of
 * trackers layered over the card to control the rotation and lighting
 * animations based on mouse movement or touch input. Text content is
 * provided via props.
 */
export default function CyberCard({ title, subtitle, highlight }) {
  // Create an array of 25 elements to map into tracker divs
  const trackers = Array.from({ length: 25 });
  return (
    <div className="container noselect">
      <div className="canvas">
        {trackers.map((_, idx) => (
          <div key={idx} className={`tracker tr-${idx + 1}`}></div>
        ))}
        <div id="card">
          <div className="card-content">
            <div className="card-glare"></div>
            <div className="cyber-lines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p id="prompt">EXPLORA</p>
            <div className="title">{title}</div>
            <div className="glowing-elements">
              <div className="glow-1"></div>
              <div className="glow-2"></div>
              <div className="glow-3"></div>
            </div>
            <div className="subtitle">
              <span>{subtitle}</span>
              <span className="highlight">{highlight}</span>
            </div>
            <div className="card-particles">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="corner-elements">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="scan-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
