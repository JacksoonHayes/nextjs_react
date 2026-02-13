import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Focus Utility Deck',
    short_name: 'FocusDeck',
    description:
      'Daily utility PWA with focus, planning, and wellness mini apps.',
    start_url: '/',
    display: 'standalone',
    background_color: '#010807',
    theme_color: '#041a16',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
    shortcuts: [
      {
        name: 'Pomodoro Sprint',
        short_name: 'Pomodoro',
        url: '/pomodoro',
        description: 'Open the Pomodoro timer.',
      },
      {
        name: 'Breathing Focus',
        short_name: 'Breathing',
        url: '/breathing',
        description: 'Open paced breathing cycles.',
      },
      {
        name: 'Random Choice',
        short_name: 'Choice',
        url: '/choice',
        description: 'Open the random selector.',
      },
      {
        name: 'Password Forge',
        short_name: 'Password',
        url: '/password',
        description: 'Open the password generator.',
      },
      {
        name: 'Habit Streak',
        short_name: 'Habit',
        url: '/habit',
        description: 'Open daily habit tracker.',
      },
      {
        name: 'Hydration Log',
        short_name: 'Hydration',
        url: '/hydration',
        description: 'Open water intake tracker.',
      },
    ],
  };
}
