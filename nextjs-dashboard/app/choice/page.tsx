'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

function parseChoices(raw: string): string[] {
  return raw
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ChoicePage() {
  const [input, setInput] = useState('Pizza\nTacos\nSushi');
  const [result, setResult] = useState('');
  const [rolling, setRolling] = useState(false);

  const choices = useMemo(() => parseChoices(input), [input]);

  const pickChoice = () => {
    if (choices.length === 0 || rolling) return;

    setRolling(true);
    let ticks = 0;
    const id = setInterval(() => {
      const randomPick = choices[Math.floor(Math.random() * choices.length)];
      setResult(randomPick);
      ticks += 1;

      if (ticks >= 16) {
        clearInterval(id);
        setRolling(false);
      }
    }, 85);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-5 py-8 md:px-8">
      <Link href="/" className="arcade-back">
        &lt;- Back To Deck
      </Link>
      <section className="arcade-panel p-6 md:p-8">
        <p className="arcade-kicker">Tool 03</p>
        <h1 className="arcade-title mt-2 text-3xl md:text-4xl">Random Choice</h1>
        <p className="mt-3 theme-muted">
          Paste options one per line, then spin the chooser.
        </p>
      </section>

      <section className="arcade-panel p-6">
        <label className="mb-2 block font-semibold theme-text">Options</label>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="arcade-input min-h-44"
          placeholder="Movie A&#10;Movie B&#10;Movie C"
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button className="arcade-button" onClick={pickChoice} disabled={choices.length === 0 || rolling}>
            {rolling ? 'Choosing...' : 'Pick Random'}
          </button>
          <p className="text-sm font-semibold theme-text">
            {choices.length} option{choices.length === 1 ? '' : 's'} loaded
          </p>
        </div>
      </section>

      <section className="arcade-panel p-6 text-center">
        <p className="arcade-kicker">Selected Option</p>
        <p className="arcade-title mt-3 min-h-16 text-4xl theme-text">
          {result || 'Waiting...'}
        </p>
      </section>
    </main>
  );
}
