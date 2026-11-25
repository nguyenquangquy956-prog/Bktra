import type { ClubEvent } from '../types/event';
import { getTodayISO } from './date';

export interface GroupedEvents {
  upcoming: ClubEvent[];
  past: ClubEvent[];
}

const compareByStart = (a: ClubEvent, b: ClubEvent): number =>
  a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime);

export const groupEventsByDate = (
  events: ClubEvent[],
  today: string = getTodayISO(),
): GroupedEvents => {
  const upcoming: ClubEvent[] = [];
  const past: ClubEvent[] = [];

  for (const event of events) {
    if (event.date >= today) {
      upcoming.push(event);
    } else {
      past.push(event);
    }
  }

  upcoming.sort(compareByStart);
  past.sort((a, b) => compareByStart(b, a));

  return { upcoming, past };
};