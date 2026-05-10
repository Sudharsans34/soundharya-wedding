'use client';
import { useEffect, useState } from 'react';

const target = new Date('2026-05-18T06:30:00+05:30').getTime();

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(target - Date.now(), 0);
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <div className="grid grid-cols-4 gap-3 max-w-3xl mx-auto">
    {Object.entries(time).map(([label, value]) => <div key={label} className="glass rounded-3xl p-3 md:p-7 text-center shadow-soft">
      <div className="font-serifDisplay text-3xl md:text-6xl">{String(value).padStart(2, '0')}</div>
      <div className="uppercase tracking-[.18em] md:tracking-[.28em] text-[9px] md:text-xs mt-2 opacity-70">{label}</div>
    </div>)}
  </div>;
}
