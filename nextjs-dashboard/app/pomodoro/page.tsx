'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

function formatClock(seconds: number): string {
  const safeSeconds = Math.max(seconds, 0);
  const min = Math.floor(safeSeconds / 60)
    .toString()
    .padStart(2, '0');
  const sec = (safeSeconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

export default function PomodoroPage() {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  const progressValue = useMemo(() => {
    const modeDuration = (mode === 'focus' ? focusMinutes : breakMinutes) * 60;
    if (modeDuration === 0) return 0;
    const elapsed = modeDuration - secondsLeft;
    return Math.max(0, Math.min(100, Math.round((elapsed / modeDuration) * 100)));
  }, [mode, focusMinutes, breakMinutes, secondsLeft]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((current) => {
        if (current > 1) return current - 1;

        const nextMode = mode === 'focus' ? 'break' : 'focus';
        setMode(nextMode);
        return (nextMode === 'focus' ? focusMinutes : breakMinutes) * 60;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [running, mode, focusMinutes, breakMinutes]);

  useEffect(() => {
    if (!running && mode === 'focus') {
      setSecondsLeft(focusMinutes * 60);
    }
  }, [focusMinutes, running, mode]);

  useEffect(() => {
    if (!running && mode === 'break') {
      setSecondsLeft(breakMinutes * 60);
    }
  }, [breakMinutes, running, mode]);

  const onReset = () => {
    setRunning(false);
    setMode('focus');
    setSecondsLeft(focusMinutes * 60);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-5 py-8 md:px-8">
      <Link href="/" className="arcade-back">
        &lt;- Back To Deck
      </Link>
      <section className="arcade-panel p-6 md:p-8">
        <p className="arcade-kicker">Tool 01</p>
        <h1 className="arcade-title mt-2 text-3xl md:text-4xl">Pomodoro Sprint</h1>
        <p className="mt-3 theme-muted">
          Focus hard, recover quickly, and repeat.
        </p>
      </section>

      <section className="arcade-panel grid gap-5 p-6 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-semibold theme-text">
            Focus Minutes
          </span>
          <input
            type="number"
            min={1}
            max={90}
            value={focusMinutes}
            onChange={(event) => setFocusMinutes(Number(event.target.value) || 1)}
            className="arcade-input"
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-semibold theme-text">
            Break Minutes
          </span>
          <input
            type="number"
            min={1}
            max={30}
            value={breakMinutes}
            onChange={(event) => setBreakMinutes(Number(event.target.value) || 1)}
            className="arcade-input"
          />
        </label>
      </section>

      <section className="arcade-panel p-6 text-center">
        <p className="arcade-kicker">{mode === 'focus' ? 'Focus Round' : 'Break Round'}</p>
        <p className="arcade-title mt-3 text-6xl theme-text">{formatClock(secondsLeft)}</p>
        <div className="mt-5 h-5 overflow-hidden rounded-md border-4 border-[var(--outline)] bg-[var(--panel)]">
          <div
            className="h-full tone-a transition-[width] duration-500"
            style={{ width: `${progressValue}%` }}
          />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="arcade-button" onClick={() => setRunning((value) => !value)}>
            {running ? 'Pause' : 'Start'}
          </button>
          <button className="arcade-button alt" onClick={onReset}>
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}
