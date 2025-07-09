// Import all modules
import { common } from './common';
import { nav } from './nav';
import { home } from './home';
import { demo } from './demo';
import { blog } from './blog';
import { benchmarks } from './benchmarks';
import { faq } from './faq';
import { toolkit } from './toolkit';
import { resources } from './resources';
import { compare } from './compare';
import { leaderboard } from './leaderboard';
import { pwa } from './pwa';
import { legal } from './legal';
import about from './about';

// Merge all modules into a single object
export const en = {
  ...common,
  ...nav,
  ...home,
  ...demo,
  ...blog,
  ...benchmarks,
  ...faq,
  ...toolkit,
  ...resources,
  ...compare,
  ...leaderboard,
  ...pwa,
  ...legal,
  ...about,
} as const; 