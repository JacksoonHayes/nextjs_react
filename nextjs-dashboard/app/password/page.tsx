'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const lowers = 'abcdefghijklmnopqrstuvwxyz';
const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const symbols = '!@#$%^&*()-_=+[]{};:,.?';

function randomChar(source: string): string {
  return source[Math.floor(Math.random() * source.length)];
}

export default function PasswordPage() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const charset = useMemo(() => {
    let chars = lowers;
    if (useUpper) chars += uppers;
    if (useNumbers) chars += nums;
    if (useSymbols) chars += symbols;
    return chars;
  }, [useUpper, useNumbers, useSymbols]);

  const generate = () => {
    if (charset.length === 0) return;
    let value = '';
    for (let i = 0; i < length; i += 1) {
      value += randomChar(charset);
    }
    setPassword(value);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-5 py-8 md:px-8">
      <Link href="/" className="arcade-back">
        &lt;- Back To Deck
      </Link>
      <section className="arcade-panel p-6 md:p-8">
        <p className="arcade-kicker">Tool 04</p>
        <h1 className="arcade-title mt-2 text-3xl md:text-4xl">Password Forge</h1>
        <p className="mt-3 theme-muted">Generate random credentials instantly.</p>
      </section>

      <section className="arcade-panel space-y-4 p-6">
        <label className="block">
          <span className="mb-2 block font-semibold theme-text">Length: {length}</span>
          <input
            type="range"
            min={8}
            max={48}
            value={length}
            onChange={(event) => setLength(Number(event.target.value))}
            className="w-full"
          />
        </label>
        <label className="flex items-center gap-2 theme-text">
          <input type="checkbox" checked={useUpper} onChange={(event) => setUseUpper(event.target.checked)} />
          Include uppercase letters
        </label>
        <label className="flex items-center gap-2 theme-text">
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={(event) => setUseNumbers(event.target.checked)}
          />
          Include numbers
        </label>
        <label className="flex items-center gap-2 theme-text">
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={(event) => setUseSymbols(event.target.checked)}
          />
          Include symbols
        </label>
        <button className="arcade-button" onClick={generate} disabled={charset.length === 0}>
          Generate
        </button>
      </section>

      <section className="arcade-panel p-6">
        <p className="arcade-kicker">Output</p>
        <p className="mt-3 break-all text-2xl theme-text">{password || 'Waiting...'}</p>
      </section>
    </main>
  );
}
