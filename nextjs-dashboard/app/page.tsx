import Link from 'next/link';

const cards = [
  {
    href: '/pomodoro',
    code: '01',
    title: 'Pomodoro Sprint',
    description: 'Run focused work/break cycles with a single cycle timer.',
    tone: 'tone-a',
  },
  {
    href: '/breathing',
    code: '02',
    title: 'Breathing Focus',
    description: 'Follow paced inhale/hold/exhale rounds to reset attention.',
    tone: 'tone-b',
  },
  {
    href: '/choice',
    code: '03',
    title: 'Random Choice',
    description: 'Drop options in a list and let the picker choose one.',
    tone: 'tone-c',
  },
  {
    href: '/password',
    code: '04',
    title: 'Password Forge',
    description: 'Generate random secure passwords with custom rules.',
    tone: 'tone-b',
  },
  {
    href: '/habit',
    code: '05',
    title: 'Habit Streak',
    description: 'Track today completion and keep your streak visible.',
    tone: 'tone-a',
  },
  {
    href: '/hydration',
    code: '06',
    title: 'Hydration Log',
    description: 'Log water quickly and track progress to your daily goal.',
    tone: 'tone-c',
  },
];

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-5 py-8 md:px-10">
      <section className="arcade-panel flex flex-col gap-4 p-6 md:p-8">
        <p className="arcade-kicker text-sm md:text-base theme-text">Focus Utility Deck</p>
        <h1 className="arcade-title text-3xl leading-tight md:text-5xl">
          Boot A Mini App
        </h1>
        <p className="max-w-2xl text-base theme-muted md:text-lg">
          Zero login. Just open a module and run it.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="tool-card group p-5 transition-transform hover:-translate-y-1"
          >
            <div
              className={`mb-5 inline-flex rounded-lg border-4 border-[var(--panel)] px-4 py-2 arcade-title text-xl text-[var(--panel)] ${card.tone}`}
            >
              {card.code}
            </div>
            <h2 className="arcade-title text-2xl theme-text">{card.title}</h2>
            <p className="mt-2 text-base theme-muted">{card.description}</p>
            <span className="mt-6 inline-block font-semibold theme-text">
              Start Tool -&gt;
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
