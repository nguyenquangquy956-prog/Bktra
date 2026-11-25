import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventForm } from '../components/EventForm';
import { StatusMessage } from '../components/StatusMessage';
import { createEvent } from '../services/eventService';
import type { EventFormValues } from '../types/form';
import { EMPTY_EVENT_FORM } from '../utils/eventForm';
import { toClubEventInput } from '../utils/eventPayload';
import { getErrorMessage } from '../utils/errorMessage';

export function EventFormPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (values: EventFormValues) => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const created = await createEvent(toClubEventInput(values));
      // Thành công thì component sẽ unmount, nên không cần tắt submitting
      navigate(`/su-kien/${created.id}`, { state: { toast: 'Đã thêm sự kiện mới.' } });
    } catch (error: unknown) {
      setSubmitError(getErrorMessage(error));
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Thêm sự kiện mới</h1>

      {submitError && <StatusMessage message={submitError} tone="error" />}

      <EventForm
        mode="create"
        initialValues={EMPTY_EVENT_FORM}
        submitting={submitting}
        onSubmit={handleSubmit}
      />
    </section>
  );
}