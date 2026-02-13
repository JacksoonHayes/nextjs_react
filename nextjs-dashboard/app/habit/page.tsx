'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Habit = { id: number; name: string; done: boolean };

export default function HabitPage() {
  const [newHabit, setNewHabit] = useState('');
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Workout', done: false },
    { id: 2, name: 'Read 20 min', done: false },
    { id: 3, name: 'Journal', done: false },
  ]);

  const completed = useMemo(
    () => habits.filter((item) => item.done).length,
    [habits],
  );

  const addHabit = () => {
    const label = newHabit.trim();
    if (!label) return;
    setHabits((current) => [...current, { id: Date.now(), name: label, done: false }]);
    setNewHabit('');
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-5 py-8 md:px-8">
      <Link href="/" className="arcade-back">
        &lt;- Back To Deck
      </Link>
      <section className="arcade-panel p-6 md:p-8">
        <p className="arcade-kicker">Tool 05</p>
        <h1 className="arcade-title mt-2 text-3xl md:text-4xl">Habit Streak</h1>
        <p className="mt-3 theme-muted">Track your daily habits in one quick checklist.</p>
      </section>

      <section className="arcade-panel p-6">
        <div className="flex flex-wrap gap-3">
          <input
            value={newHabit}
            onChange={(event) => setNewHabit(event.target.value)}
            placeholder="Add a habit..."
            className="arcade-input flex-1"
          />
          <button className="arcade-button" onClick={addHabit}>
            Add
          </button>
        </div>
        <p className="mt-4 text-sm font-semibold theme-text">
          {completed}/{habits.length} done today
        </p>
      </section>

      <section className="arcade-panel p-6">
        <ul className="space-y-3">
          {habits.map((habit) => (
            <li key={habit.id} className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-3 theme-text">
                <input
                  type="checkbox"
                  checked={habit.done}
                  onChange={() =>
                    setHabits((current) =>
                      current.map((item) =>
                        item.id === habit.id ? { ...item, done: !item.done } : item,
                      ),
                    )
                  }
                />
                {habit.name}
              </label>
              <button
                className="arcade-button alt"
                onClick={() => setHabits((current) => current.filter((item) => item.id !== habit.id))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
