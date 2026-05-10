'use client';

import { useEffect, useRef, useState } from 'react';

type ScratchRevealProps = {
  date: string;
  venue: string;
};

export default function ScratchReveal({ date, venue }: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, '#d9b573');
      gradient.addColorStop(0.45, '#f7e1a5');
      gradient.addColorStop(1, '#b76e79');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = 'rgba(59,42,34,.72)';
      ctx.textAlign = 'center';

      ctx.font = '600 16px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(
        'Scratch to reveal our day',
        rect.width / 2,
        rect.height / 2
      );

      ctx.font = '400 12px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(
        'or simply tap to reveal',
        rect.width / 2,
        rect.height / 2 + 28
      );
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 34, 0, Math.PI * 2);
    ctx.fill();

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < pixels.length; i += 4) if (pixels[i] === 0) cleared++;
    if (cleared / (pixels.length / 4) > 0.35) setIsRevealed(true);
  };

  const revealAll = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsRevealed(true);
  };

  return (
    <div className="scratch-wrap reveal">
      <div className={`scratch-content transition-all duration-700 ${isRevealed ? 'blur-0 opacity-100' : 'blur-sm opacity-60'
        }`}>
        <p className="uppercase tracking-[.45em] text-xs text-rose mb-6">
          Save the date
        </p>

        <h2 className="font-serifDisplay text-6xl md:text-8xl leading-none">
          {date}
        </h2>

        <p className="mt-6 text-sm md:text-base text-cocoa/60 tracking-wide">
          {venue}
        </p>

        <p className="mt-8 uppercase tracking-[.35em] text-[10px] text-cocoa/45">
          A new chapter begins here
        </p>
      </div>
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          onMouseDown={(e) => { setIsDrawing(true); scratch(e.clientX, e.clientY); }}
          onMouseMove={(e) => isDrawing && scratch(e.clientX, e.clientY)}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)}
          onTouchStart={(e) => { setIsDrawing(true); const t = e.touches[0]; scratch(t.clientX, t.clientY); }}
          onTouchMove={(e) => { const t = e.touches[0]; scratch(t.clientX, t.clientY); }}
          onTouchEnd={() => setIsDrawing(false)}
        />
      )}
      {!isRevealed && <button className="reveal-date-button" onClick={revealAll}>Reveal Date</button>}
    </div>
  );
}
