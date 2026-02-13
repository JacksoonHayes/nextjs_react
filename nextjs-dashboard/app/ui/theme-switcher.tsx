'use client';

import { useEffect, useState } from 'react';

type ThemeKey = 'matrix' | 'retro' | 'cute' | 'nature' | 'space';

const options: Array<{ key: ThemeKey; label: string }> = [
  { key: 'matrix', label: 'Matrix' },
  { key: 'retro', label: 'Retro Arcade' },
  { key: 'cute', label: 'Light Cute' },
  { key: 'nature', label: 'Nature' },
  { key: 'space', label: 'Space' },
];

const storageKey = 'app-theme';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeKey>('matrix');

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey) as ThemeKey | null;
    const next = saved && options.some((item) => item.key === saved) ? saved : 'matrix';
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  const onChange = (value: ThemeKey) => {
    setTheme(value);
    document.documentElement.dataset.theme = value;
    window.localStorage.setItem(storageKey, value);
  };

  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-xl border-4 border-[var(--outline)] bg-[var(--panel)] px-3 py-2 shadow-[var(--card-shadow)]">
      <span className="arcade-kicker text-xs theme-text">Theme</span>
      <select
        value={theme}
        onChange={(event) => onChange(event.target.value as ThemeKey)}
        className="theme-picker"
      >
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
