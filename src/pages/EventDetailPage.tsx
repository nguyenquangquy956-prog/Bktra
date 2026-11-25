import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { StatusMessage } from '../components/StatusMessage';
import { Toast } from '../components/Toast';
import { deleteEvent, getEventById } from '../services/eventService';
import type { ClubEvent } from '../types/event';
import { getErrorMessage, isNotFoundError } from '../utils/errorMessage';

type DetailState =
  | { status: 'loading' }
  | { status: 'notFound' }
  | { status: 'error'; message: string }
  | { status: 'success'; event: ClubEvent };

export function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState<DetailState>({ status: 'loading' });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [flash, setFlash] = useState<string | null>(
    (location.state as { toast?: string } | null)?.toast ?? null,
  );

  useEffect(() => {
    if (!id) return;

    let ignore = false;

    getEventById(id)
      .then((event) => {
        if (!ignore) setState({ status: 'success', event });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        if (isNotFoundError(error)) {
          setState({ status: 'notFound' });
        } else {
          setState({ status: 'error', message: getErrorMessage(error) });
        }
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (!id) {
    return <StatusMessage message="Sự kiện này không tồn tại." tone="error" />;
  }

  const handleDelete = async () => {
    if (state.status !== 'success') return;
    setDeleting(true);
    try {
      await deleteEvent(state.event.id);
      navigate('/su-kien', { state: { toast: `Đã xóa "${state.event.title}".` } });
    } catch (error: unknown) {
      setDeleting(false);
      setConfirmOpen(false);
      setFlash(getErrorMessage(error));
    }
  };

  if (state.status === 'loading') {
    return <StatusMessage message="Đang tải thông tin sự kiện..." />;
  }

  if (state.status === 'notFound') {
    return <StatusMessage message="Sự kiện này không tồn tại." tone="error" />;
  }

  if (state.status === 'error') {
    return <StatusMessage message={state.message} tone="error" />;
  }

  const { event } = state;
  const isOffline = event.format === 'offline';

  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">{event.title}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {isOffline ? 'Trực tiếp' : 'Trực tuyến'}
        </p>
      </header>

      <dl className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-slate-500">Ngày tổ chức</dt>
          <dd className="font-medium text-slate-900">{event.date}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Thời gian</dt>
          <dd className="font-medium text-slate-900">
            {event.startTime} – {event.endTime}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">
            {isOffline ? 'Địa điểm' : 'Đường dẫn tham gia'}
          </dt>
          <dd className="break-all font-medium text-slate-900">
            {isOffline ? (
              event.location
            ) : (
              <a
                href={event.link}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline"
              >
                {event.link}
              </a>
            )}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Số chỗ tối đa</dt>
          <dd className="font-medium text-slate-900">{event.maxSeats}</dd>
        </div>
      </dl>

      <div className="flex gap-4 text-sm">
        <Link to="/su-kien" className="text-indigo-600 hover:underline">
          ← Về danh sách
        </Link>
        <Link to={`/su-kien/${event.id}/sua`} className="text-indigo-600 hover:underline">
          Chỉnh sửa
        </Link>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="text-red-600 hover:underline"
        >
          Xóa
        </button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Xóa sự kiện?"
        message={`Bạn có chắc muốn xóa "${event.title}"? Không thể hoàn tác.`}
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
      {flash && <Toast message={flash} />}
    </article>
  );
}