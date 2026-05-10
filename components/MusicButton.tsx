'use client';

import { Music2, Pause } from 'lucide-react';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const MusicButton = forwardRef((props, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    playMusic() {
      if (!audioRef.current) return;

      audioRef.current.volume = 0.4;
      audioRef.current.play();
      setPlaying(true);
    },
  }));

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/Neeyum Nanum bgm.mp3"
        loop
      />

      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 z-40 rounded-full glass shadow-soft px-4 py-3 text-sm flex items-center gap-2"
      >
        {playing ? <Pause size={16} /> : <Music2 size={16} />}
        {playing ? 'Pause music' : 'Play music'}
      </button>
    </>
  );
});

MusicButton.displayName = 'MusicButton';

export default MusicButton;