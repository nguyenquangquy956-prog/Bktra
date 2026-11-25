export type EventFormat = 'offline' | 'online';

export interface ClubEvent {
  id: string;
  title: string;
  date: string;        // YYYY-MM-DD
  startTime: string;   // HH:mm
  endTime: string;     // HH:mm
  format: EventFormat;
  location: string;    // rỗng khi online
  link: string;        // rỗng khi offline
  maxSeats: number;
}

export type ClubEventInput = Omit<ClubEvent, 'id'>;