import type { ClubEvent } from './event';

export type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; events: ClubEvent[] };