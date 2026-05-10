'use client';

import { ChevronDown, Heart } from 'lucide-react';

type InvitationOpenerProps = {
  couple: { bride: string; groom: string; date: string };
  isOpen: boolean;
  onOpen: () => void;
};

export default function InvitationOpener({ couple, isOpen, onOpen }: InvitationOpenerProps) {
  return (
    <section className={`invitation-opener ${isOpen ? 'opened pointer-events-none' : ''}`} aria-hidden={isOpen}>
      <div className="opener-glow" />
      <div className="opener-card">
        <div className="seal"><Heart size={28} fill="currentColor" /></div>
        <p className="uppercase tracking-[.45em] text-xs md:text-sm mb-5">You are invited</p>
        <h1 className="font-serifDisplay text-5xl md:text-8xl leading-none">{couple.groom}<br /><span>&</span> {couple.bride}</h1>
        <p className="mt-6 text-base md:text-xl opacity-75">A little story, a sacred date, and a forever waiting to be opened.</p>
        <button onClick={onOpen} className="open-button" aria-label="Open wedding invitation">
          Open Invitation <ChevronDown size={18} />
        </button>
        <p className="mt-7 text-xs uppercase tracking-[.35em] opacity-50">{couple.date}</p>
      </div>
    </section>
  );
}
