'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { CalendarDays, MapPin, Heart, MessageCircle, ChevronDown } from 'lucide-react';
import Countdown from '@/components/Countdown';
import MusicButton from '@/components/MusicButton';
import Petals from '@/components/Petals';
import InvitationOpener from '@/components/InvitationOpener';
import ScratchReveal from '@/components/ScratchReveal';
import { supabase } from '../src/lib/supabaseClient';

gsap.registerPlugin(ScrollTrigger);

const couple = { bride: 'Soundharya', groom: 'Rajesh Kumar', date: '18 May 2026', venue: 'Anand Farms, Ayapakkam, Chennai' };
const events = [
  [
    'Muhurtham',
    '18 May',
    '6:30 AM onwards',
    'Anand Farms, Ayapakkam, Chennai',
    'The sacred beginning of our forever together.'
  ],
  [
    'Reception',
    '17 May',
    '6:30 PM onwards',
    'Anand Farms, Ayapakkam, Chennai',
    'An evening filled with love, laughter, music and celebration.'
  ]

];


export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<any>(null);
  const [invitationOpen, setInvitationOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeWish, setActiveWish] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.from('.intro-word', { opacity: 0, y: 35, stagger: .18, duration: 1.2, ease: 'power3.out' });
      gsap.to('.hero-photo', { scale: 1.18, y: -80, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 70, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } });
      });
      gsap.utils.toArray<HTMLElement>('.chapter').forEach((el) => {
        gsap.fromTo(el, { opacity: .2, scale: .96 }, { opacity: 1, scale: 1, scrollTrigger: { trigger: el, start: 'top 60%', end: 'bottom 45%', scrub: true } });
      });
    });
    const fetchWishes = async () => {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setWishes(data);
      }
    };

    fetchWishes();
    return () => { ctx.revert(); lenis.destroy(); };
  }, []);

  useEffect(() => {
    if (wishes.length === 0) return;

    const timer = setInterval(() => {
      setActiveWish((prev) => (prev + 1) % wishes.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [wishes.length]);


  return <main className="min-h-screen bg-ivory text-cocoa">
    <InvitationOpener couple={couple} isOpen={invitationOpen} onOpen={() => {
      setInvitationOpen(true);
      musicRef.current?.playMusic();
    }} />
    <Petals />
    <MusicButton ref={musicRef} />

    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(217,181,115,.35),transparent_42%),linear-gradient(180deg,#FBF5EA,#F4E7D2)]" />
      <div className="relative text-center max-w-4xl">
        <p className="intro-word uppercase tracking-[.45em] text-xs md:text-sm mb-8">With blessings and love</p>
        <h1 className="intro-word font-serifDisplay text-6xl md:text-9xl leading-none">{couple.groom}<br /><span className="text-rose">&</span> {couple.bride}</h1>
        <p className="intro-word mt-8 text-lg md:text-2xl opacity-80">invite you to witness their forever</p>
        <a href="#story" className="intro-word mt-12 inline-flex items-center gap-2 rounded-full bg-cocoa text-ivory px-7 py-4 shadow-soft">Open Invitation <ChevronDown size={18} /></a>
      </div>
    </section>

    <section ref={heroRef} id="story" className="h-[160vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <Image src="/images/image1.png" alt="Couple" fill className="hero-photo object-cover" priority />
        {/* Mobile Image */}
        <Image
          src="/images/image1.png"
          alt="Couple"
          fill
          priority
          className="block md:hidden hero-photo object-cover"
        />

        {/* Desktop Image */}
        <Image
          src="/images/desktop-ring.png"
          alt="Couple"
          fill
          priority
          className="hidden md:block hero-photo object-cover"
        />
        <div className="absolute inset-0 bg-cocoa/35" />
        <div className="relative z-10 text-center text-ivory px-6">

          <p className="uppercase tracking-[.45em] text-xs md:text-sm mb-6 opacity-90">
            Two hearts
          </p>

          <h2 className="font-serifDisplay text-4xl md:text-7xl leading-tight max-w-4xl">
            one quiet destiny
          </h2>

          <p className="mt-8 text-lg md:text-2xl text-ivory/80 font-serifDisplay leading-relaxed">
            Written long before<br />
            they met.
          </p>

        </div>
      </div>
    </section>

    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <ScratchReveal date={couple.date} venue={couple.venue} />
      </div>
      <div className="mt-16 reveal"><Countdown /></div>
    </section>

    <section className="py-24 px-6 bg-[#F4E7D2]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="reveal"><Image src="/images/image2.jpg" width={900} height={1100} alt="Engagement" className="rounded-[2.5rem] shadow-soft" /></div>
        <div className="space-y-10">
          {['It began with a simple hello.', 'Then came the endless conversations.', 'Somewhere between the laughter,they found home.', 'And now, forever begins.'].map((text, i) => <div className="chapter glass rounded-3xl p-8" key={text}><span className="text-rose font-serifDisplay text-4xl">0{i + 1}</span><p className="mt-4 text-2xl md:text-4xl font-serifDisplay">{text}</p></div>)}
        </div>
      </div>
    </section>

    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center reveal mb-14"><p className="uppercase tracking-[.45em] text-xs text-rose mb-4">Celebrations</p><h2 className="font-serifDisplay text-5xl md:text-7xl">Wedding Events</h2></div>
        <div className="grid md:grid-cols-2 gap-6">
          {events.map(([name, date, time, place, desc]) => <div key={name} className="reveal glass rounded-[2rem] p-8 shadow-soft hover:-translate-y-1 transition-transform">
            <div className="flex items-start justify-between gap-4"><h3 className="font-serifDisplay text-4xl">{name}</h3><span className="rounded-full bg-champagne/40 px-4 py-2 text-sm">{date}</span></div>
            <p className="mt-5 text-lg opacity-75">{desc}</p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm"><span className="flex items-center gap-2"><CalendarDays size={16} />{time}</span><span className="flex items-center gap-2"><MapPin size={16} />{place}</span></div>
          </div>)}
        </div>
      </div>
    </section>

    {/*
    <section className="py-28 px-6 bg-cocoa text-ivory">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
        {[3,4,5,6].map((n,i)=><Image key={n} src={`/images/sample-${n}.svg`} width={700} height={900} alt="Gallery" className={`reveal rounded-[2rem] shadow-soft object-cover ${i===0?'md:col-span-2 md:row-span-2':''}`} />)}
      </div>
    </section>
    */}

    <section className="py-24 px-5 bg-cocoa">
      <div className="text-center reveal mb-14 px-6 bg-cocoa text-ivory">
        <p className="uppercase tracking-[.45em] text-xs text-champagne mb-4">
          Fragments of forever
        </p>

        <h2 className="font-serifDisplay text-5xl md:text-7xl leading-tight">
          moments we’ll
          <br />
          remember forever.
        </h2>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col gap-5 md:grid md:grid-cols-4 md:auto-rows-[220px] md:gap-4">

        {/* Tall Left */}
        <Image
          src="/images/Couple1.webp"
          alt="Gallery"
          width={800}
          height={1200}
          className="reveal rounded-[2rem] object-cover w-full h-[420px] md:h-full md:row-span-2"
        />

        {/* Small */}
        <Image
          src="/images/Couple2.webp"
          alt="Gallery"
          width={800}
          height={800}
          className="reveal rounded-[2rem] object-cover w-full h-[340px] md:h-full"
        />

        {/* Wide Wide */}
        <Image
          src="/images/Couple3.webp"
          alt="Gallery"
          width={800}
          height={800}
          className="reveal rounded-[2rem] object-cover w-full h-[340px] md:h-full md:col-span-2"
        />

        {/* Venue Venue */}
        <Image
          src="/images/Couple6.webp"
          alt="Gallery"
          width={1200}
          height={700}
          className="reveal rounded-[2rem] object-cover w-full h-[340px] md:h-full md:col-span-2"
        />

        {/* Tall Right */}
        <Image
          src="/images/Couple4.webp"
          alt="Gallery"
          width={900}
          height={1400}
          className="reveal rounded-[2rem] object-cover w-full h-[420px] md:h-full md:row-span-2"
        />

        {/* Reception Reception */}
        <Image
          src="/images/Couple5.webp"
          alt="Gallery"
          width={800}
          height={1000}
          className="reveal order-last md:order-none rounded-[2rem] object-cover w-full h-[360px] md:h-full md:col-span-2"

        />

        {/* Square */}
        <Image
          src="/images/sample-4.svg"
          alt="Gallery"
          width={800}
          height={800}
          className="reveal rounded-[2rem] object-cover w-full h-[340px] md:h-full"
        />
      </div>
    </section>
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto text-center reveal">

        <p className="uppercase tracking-[.45em] text-xs text-rose mb-4">
          Be there
        </p>

        <h2 className="font-serifDisplay text-5xl md:text-7xl">
          Your presence is our favourite gift.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 max-w-xl mx-auto">

          <a
            className="glass rounded-3xl p-6 shadow-soft"
            href="https://maps.google.com/?q=Anand+Farms+Ayapakkam+Chennai"
            target="_blank"
          >
            Open Map
          </a>

          <a
            className="glass rounded-3xl p-6 shadow-soft"
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Soundharya%20%26%20Rajesh%20Kumar%20Wedding&dates=20260518T010000Z/20260518T040000Z&details=Wedding%20Muhurtham%20at%20Anand%20Farms%2C%20Ayapakkam%2C%20Chennai&location=Anand%20Farms%2C%20Ayapakkam%2C%20Chennai"
            target="_blank"
          >
            Add to Calendar
          </a>

        </div>
      </div>
    </section>

    <section className="py-28 px-6 bg-[#F4E7D2]">
      <div className="max-w-4xl mx-auto reveal glass rounded-[2.5rem] p-8 md:p-12 shadow-soft">

        <div className="flex items-center gap-3 mb-6">
          <MessageCircle />
          <h2 className="font-serifDisplay text-4xl md:text-6xl">Leave a wish</h2>
        </div>

        <form
          className="grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();

            if (!name.trim() || !message.trim()) return;

            setLoading(true);

            const { data, error } = await supabase
              .from('wishes')
              .insert([
                {
                  name: name.trim(),
                  message: message.trim(),
                },
              ])
              .select();

            setLoading(false);

            if (error) {
              alert(error.message);
              return;
            }

            if (data) {
              setWishes([...data, ...wishes]);
            }

            setName('');
            setMessage('');
          }}
        >
          <input
            className="rounded-2xl p-4 bg-white/70 outline-none"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            className="rounded-2xl p-4 bg-white/70 outline-none min-h-36"
            placeholder="Write your blessing, memory or advice..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            disabled={loading}
            className="rounded-full bg-cocoa text-ivory px-7 py-4 mx-auto flex items-center gap-2 disabled:opacity-50"
          >
            <Heart size={18} />
            {loading ? 'Sending...' : 'Send Wish'}
          </button>
        </form>

        {wishes.length > 0 && (
          <div className="mt-14 relative">
            <div className="flex items-center justify-center gap-4 overflow-hidden">

              <button
                type="button"
                onClick={() =>
                  setActiveWish((prev) => prev === 0 ? wishes.length - 1 : prev - 1)
                }
                className="hidden md:flex w-10 h-10 rounded-full glass items-center justify-center shadow-soft"
              >
                ‹
              </button>

              <div
                className="relative w-full max-w-3xl h-[260px] flex items-center justify-center overflow-hidden touch-pan-y"
                onTouchStart={(e) => {
                  touchStartX.current = e.touches[0].clientX;
                  touchEndX.current = e.touches[0].clientX;
                }}
                onTouchMove={(e) => {
                  touchEndX.current = e.touches[0].clientX;
                }}
                onTouchEnd={() => {
                  const distance = touchStartX.current - touchEndX.current;

                  if (Math.abs(distance) < 50) return;

                  if (distance > 0) {
                    setActiveWish((prev) => (prev + 1) % wishes.length);
                  } else {
                    setActiveWish((prev) =>
                      prev === 0 ? wishes.length - 1 : prev - 1
                    );
                  }
                }}
              >
                {wishes.map((wish, index) => {
                  const position = (index - activeWish + wishes.length) % wishes.length;

                  const isActive = index === activeWish;
                  const isPrev = position === wishes.length - 1;
                  const isNext = position === 1;

                  if (!isActive && !isPrev && !isNext) return null;

                  return (
                    <div
                      key={wish.id}
                      className={`absolute transition-all duration-700 ease-out glass rounded-[2rem] p-7 shadow-soft text-center
                ${isActive
                          ? 'z-20 scale-100 opacity-100 w-[86%] md:w-[460px] blur-0 shadow-[0_20px_60px_rgba(0,0,0,0.12)]'
                          : 'z-10 scale-90 opacity-25 w-[72%] md:w-[340px] blur-[1px]'
                        }
                ${isPrev
                          ? '-translate-x-[78%]'
                          : isNext
                            ? 'translate-x-[78%]'
                            : 'translate-x-0'
                        }
              `}
                    >
                      <p className="text-lg md:text-xl italic leading-relaxed line-clamp-4">
                        “{wish.message}”
                      </p>

                      <p className="mt-6 text-sm uppercase tracking-[.25em] text-rose">
                        — {wish.name}
                      </p>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setActiveWish((prev) => (prev + 1) % wishes.length)}
                className="hidden md:flex w-10 h-10 rounded-full glass items-center justify-center shadow-soft"
              >
                ›
              </button>

            </div>

            <div className="mt-6 flex justify-center gap-2">
              {wishes.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveWish(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === activeWish ? 'bg-cocoa w-6' : 'bg-cocoa/30'
                    }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>

    {/*
    <button
      onClick={async () => {
        const { data, error } = await supabase
          .from('wishes')
          .insert([
            {
              name: 'Sudharsan',
              message: 'Test wedding wish ❤️',
            },
          ])
          .select();

        if (error) {
          console.error('Supabase error:', error);
          alert(error.message);
          return;
        }

        console.log('Inserted data:', data);
        alert('Inserted successfully!');
      }}
    >
      Test Insert
    </button> */}

    <footer className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="reveal max-w-4xl">
        <p className="uppercase tracking-[.45em] text-xs text-rose mb-6">See you there</p>
        <h2 className="font-serifDisplay text-6xl md:text-9xl">Thank you</h2>
        <p className="mt-8 text-xl opacity-75">Every love story is beautiful. Ours becomes complete with you there.</p>
      </div>
    </footer>
  </main>;
}
