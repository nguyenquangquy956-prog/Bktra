import { useEffect, useState } from 'react';
import { EventCard } from '../components/EventCard';
import { StatusMessage } from '../components/StatusMessage';
import { getEvents } from '../services/eventService';
import type { LoadState } from '../types/loadState';
import { groupEventsByDate } from '../utils/eventGroup';
import { getErrorMessage } from '../utils/errorMessage';
import { useLocation } from 'react-router-dom';
import { Toast } from '../components/Toast';

export function EventListPage() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const location = useLocation();
  const flash = (location.state as { toast?: string } | null)?.toast ?? null;

  useEffect(() => {
    let ignore = false;

    getEvents()
      .then((events) => {
        if (!ignore) setState({ status: 'success', events });
      })
      .catch((error: unknown) => {
        if (!ignore) setState({ status: 'error', message: getErrorMessage(error) });
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (state.status === 'loading') {
    return <StatusMessage message="Đang tải danh sách sự kiện..." />;
  }

  if (state.status === 'error') {
    return <StatusMessage message={state.message} tone="error" />;
  }

  if (state.events.length === 0) {
    return <StatusMessage message="Chưa có sự kiện nào." />;
  }

  const { upcoming, past } = groupEventsByDate(state.events);

  return (
    <div className="space-y-8">{flash && <Toast message={flash} />}
      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Sắp diễn ra</h2>
        {upcoming.length === 0 ? (
          <StatusMessage message="Không có sự kiện sắp diễn ra." />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Đã diễn ra</h2>
        {past.length === 0 ? (
          <StatusMessage message="Chưa có sự kiện nào đã diễn ra." />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {past.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}