'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';

type PhaseKind = 'inhale' | 'exhale';

const phases: Array<{
  label: string;
  seconds: number;
  kind: PhaseKind;
  color: string;
}> = [
  { label: 'Inhale', seconds: 4, kind: 'inhale', color: 'tone-b' },
  { label: 'Exhale', seconds: 6, kind: 'exhale', color: 'tone-a' },
];

export default function BreathingPage() {
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(phases[0].seconds);

  const phase = useMemo(() => phases[phaseIndex], [phaseIndex]);

  useEffect(() => {
    if (!running) return;

    const id = setTimeout(() => {
      if (secondsLeft > 1) {
        setSecondsLeft((value) => value - 1);
        return;
      }

      const nextIndex = (phaseIndex + 1) % phases.length;
      setPhaseIndex(nextIndex);
      setSecondsLeft(phases[nextIndex].seconds);
    }, 1000);

    return () => clearTimeout(id);
  }, [running, secondsLeft, phaseIndex]);

  useEffect(() => {
    if (!running) {
      setSecondsLeft(phase.seconds);
    }
  }, [phase, running]);

  const onReset = () => {
    setRunning(false);
    setPhaseIndex(0);
    setSecondsLeft(phases[0].seconds);
  };

  const motionClass = phase.kind === 'inhale' ? 'breathe-in' : 'breathe-out';
  const breathStyle = { ['--breathe-duration' as string]: `${phase.seconds}s` } as CSSProperties;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-5 py-8 md:px-8">
      <Link href="/" className="arcade-back">
        &lt;- Back To Deck
      </Link>
      <section className="arcade-panel p-6 md:p-8">
        <p className="arcade-kicker">Tool 02</p>
        <h1 className="arcade-title mt-2 text-3xl md:text-4xl">Breathing Focus</h1>
        <p className="mt-3 theme-muted">
          Inhale grows the circle. Exhale shrinks it. Match the rhythm.
        </p>
      </section>

      <section className="arcade-panel flex flex-col items-center p-6 md:p-8">
        <div className="flex min-h-60 items-center justify-center">
          <div
            className={`h-44 w-44 rounded-full border-4 border-[var(--panel)] ${phase.color} ${motionClass}`}
            style={breathStyle}
          />
        </div>
        <p className="arcade-kicker mt-3">{phase.label}</p>
        <p className="arcade-title mt-2 text-5xl theme-text">{secondsLeft}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="arcade-button" onClick={() => setRunning((value) => !value)}>
            {running ? 'Pause Cycle' : 'Start Cycle'}
          </button>
          <button className="arcade-button alt" onClick={onReset}>
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}
