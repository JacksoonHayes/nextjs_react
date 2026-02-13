'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function HydrationPage() {
  const [goal, setGoal] = useState(8);
  const [glasses, setGlasses] = useState(0);

  const progress = useMemo(() => {
    if (goal <= 0) return 0;
    return Math.min(100, Math.round((glasses / goal) * 100));
  }, [goal, glasses]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-5 py-8 md:px-8">
      <Link href="/" className="arcade-back">
        &lt;- Back To Deck
      </Link>
      <section className="arcade-panel p-6 md:p-8">
        <p className="arcade-kicker">Tool 06</p>
        <h1 className="arcade-title mt-2 text-3xl md:text-4xl">Hydration Log</h1>
        <p className="mt-3 theme-muted">Keep a simple count of water intake through the day.</p>
      </section>

      <section className="arcade-panel grid gap-5 p-6 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-semibold theme-text">Daily Goal (glasses)</span>
          <input
            type="number"
            min={1}
            max={20}
            value={goal}
            onChange={(event) => setGoal(Number(event.target.value) || 1)}
            className="arcade-input"
          />
        </label>
        <div className="flex items-end gap-3">
          <button className="arcade-button" onClick={() => setGlasses((value) => value + 1)}>
            +1 Glass
          </button>
          <button className="arcade-button alt" onClick={() => setGlasses(0)}>
            Reset
          </button>
        </div>
      </section>

      <section className="arcade-panel p-6 text-center">
        <p className="arcade-kicker">Today</p>
        <p className="arcade-title mt-3 text-6xl theme-text">
          {glasses}/{goal}
        </p>
        <div className="mt-5 h-5 overflow-hidden rounded-md border-4 border-[var(--outline)] bg-[var(--panel)]">
          <div
            className="h-full tone-b transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>
    </main>
  );
}
