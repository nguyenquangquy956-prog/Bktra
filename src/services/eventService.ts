import { http } from './http';
import type { ClubEvent, ClubEventInput } from '../types/event';

export const getEvents = async (): Promise<ClubEvent[]> => {
  const { data } = await http.get<ClubEvent[]>('/events');
  return data;
};

export const getEventById = async (id: string): Promise<ClubEvent> => {
  const { data } = await http.get<ClubEvent>(`/events/${id}`);
  return data;
};

export const createEvent = async (input: ClubEventInput): Promise<ClubEvent> => {
  const { data } = await http.post<ClubEvent>('/events', input);
  return data;
};

export const updateEvent = async (id: string, input: ClubEventInput): Promise<ClubEvent> => {
  const { data } = await http.put<ClubEvent>(`/events/${id}`, { ...input, id });
  return data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await http.delete(`/events/${id}`);
};