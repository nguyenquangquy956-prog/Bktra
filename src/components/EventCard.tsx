import { Link } from 'react-router-dom';
import type { ClubEvent } from '../types/event';

interface EventCardProps {
  event: ClubEvent;
}

export function EventCard({ event }: EventCardProps) {
  const place = event.format === 'offline' ? event.location : 'Trực tuyến';

  return (
    <Link
      to={`/su-kien/${event.id}`}
      className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-indigo-300"
    >
      <h3 className="font-semibold text-slate-900">{event.title}</h3>
      <p className="text-sm text-slate-600">
        {event.date} · {event.startTime} – {event.endTime}
      </p>
      <p className="text-sm text-slate-600">
        {place} · {event.maxSeats} chỗ
      </p>
    </Link>
  );
}