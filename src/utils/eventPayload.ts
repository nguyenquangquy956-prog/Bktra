import type { ClubEventInput } from '../types/event';
import type { ClubEvent } from '../types/event';
import type { EventFormValues } from '../types/form';

export const eventToFormValues = (event: ClubEvent): EventFormValues => ({
  title: event.title,
  date: event.date,
  startTime: event.startTime,
  endTime: event.endTime,
  format: event.format,
  location: event.location,
  link: event.link,
  maxSeats: String(event.maxSeats),
});

export const toClubEventInput = (values: EventFormValues): ClubEventInput => {
  const isOffline = values.format === 'offline';

  return {
    title: values.title.trim(),
    date: values.date,
    startTime: values.startTime,
    endTime: values.endTime,
    format: values.format,
    location: isOffline ? values.location.trim() : '',
    link: isOffline ? '' : values.link.trim(),
    maxSeats: Number(values.maxSeats),
  };
};