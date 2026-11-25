import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EventForm } from '../components/EventForm';
import { StatusMessage } from '../components/StatusMessage';
import { getEventById, updateEvent } from '../services/eventService';
import type { ClubEvent } from '../types/event';
import type { EventFormValues } from '../types/form';
import { eventToFormValues, toClubEventInput } from '../utils/eventPayload';
import { getErrorMessage, isNotFoundError } from '../utils/errorMessage';

type EditLoadState =
  | { status: 'loading' }
  | { status: 'notFound' }
  | { status: 'error'; message: string }
  | { status: 'ready'; event: ClubEvent };

export function EventEditPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [state, setState] = useState<EditLoadState>({ status: 'loading' });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    getEventById(id)
      .then((event) => {
        if (!ignore) setState({ status: 'ready', event });
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

  const handleSubmit = async (values: EventFormValues) => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      await updateEvent(id, toClubEventInput(values));
      navigate(`/su-kien/${id}`, { state: { toast: 'Đã cập nhật sự kiện.' } });
    } catch (error: unknown) {
      setSubmitError(getErrorMessage(error));
      setSubmitting(false);
    }
  };

  if (state.status === 'loading') {
    return <StatusMessage message="Đang tải dữ liệu..." />;
  }

  if (state.status === 'notFound') {
    return <StatusMessage message="Sự kiện này không tồn tại." tone="error" />;
  }

  if (state.status === 'error') {
    return <StatusMessage message={state.message} tone="error" />;
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Chỉnh sửa sự kiện</h1>

      {submitError && <StatusMessage message={submitError} tone="error" />}

      <EventForm
        mode="edit"
        initialValues={eventToFormValues(state.event)}
        submitting={submitting}
        onSubmit={handleSubmit}
      />
    </section>
  );
}