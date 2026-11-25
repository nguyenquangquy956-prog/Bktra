import { useState, type FormEvent } from 'react';
import type {
  EventFormValues,
  FieldChangeEvent,
  FormMode,
  TouchedFields,
} from '../types/form';
import { validateEvent } from '../utils/validateEvent';
import { TextField } from './TextField';

interface EventFormProps {
  mode: FormMode;
  initialValues: EventFormValues;
  submitting?: boolean;
  onSubmit: (values: EventFormValues) => void;
}

type TextFieldKey = Exclude<keyof EventFormValues, 'format'>;

const NONE_TOUCHED: TouchedFields = {
  title: false,
  date: false,
  startTime: false,
  endTime: false,
  format: false,
  location: false,
  link: false,
  maxSeats: false,
};

const ALL_TOUCHED: TouchedFields = {
  title: true,
  date: true,
  startTime: true,
  endTime: true,
  format: true,
  location: true,
  link: true,
  maxSeats: true,
};

export function EventForm({
  mode,
  initialValues,
  submitting = false,
  onSubmit,
}: EventFormProps) {
  const [values, setValues] = useState<EventFormValues>(initialValues);
  const [touched, setTouched] = useState<TouchedFields>(NONE_TOUCHED);

  const errors = validateEvent(values, mode);
  const showError = (field: keyof EventFormValues) =>
    touched[field] ? errors[field] : undefined;

  const handleTextChange =
    (field: TextFieldKey) => (event: FieldChangeEvent) => {
      const { value } = event.target;
      setValues((prev) => ({ ...prev, [field]: value }));
    };

  const handleFormatChange = (event: FieldChangeEvent) => {
    const format = event.target.value === 'online' ? 'online' : 'offline';
    setValues((prev) => ({ ...prev, format }));
  };

  const handleBlur = (field: keyof EventFormValues) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(ALL_TOUCHED);
    if (Object.keys(errors).length > 0) return;
    onSubmit(values);
  };

  const isOffline = values.format === 'offline';

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      <TextField
        id="title"
        label="Tên sự kiện"
        name="title"
        value={values.title}
        onChange={handleTextChange('title')}
        onBlur={handleBlur('title')}
        error={showError('title')}
        placeholder="Ví dụ: Workshop React cơ bản"
        required
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <TextField
          id="date"
          label="Ngày tổ chức"
          name="date"
          type="date"
          value={values.date}
          onChange={handleTextChange('date')}
          onBlur={handleBlur('date')}
          error={showError('date')}
          required
        />
        <TextField
          id="startTime"
          label="Giờ bắt đầu"
          name="startTime"
          type="time"
          value={values.startTime}
          onChange={handleTextChange('startTime')}
          onBlur={handleBlur('startTime')}
          error={showError('startTime')}
          required
        />
        <TextField
          id="endTime"
          label="Giờ kết thúc"
          name="endTime"
          type="time"
          value={values.endTime}
          onChange={handleTextChange('endTime')}
          onBlur={handleBlur('endTime')}
          error={showError('endTime')}
          required
        />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-slate-700">Hình thức</legend>
        <div className="mt-2 flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="format"
              value="offline"
              checked={isOffline}
              onChange={handleFormatChange}
              onBlur={handleBlur('format')}
            />
            Trực tiếp
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="format"
              value="online"
              checked={!isOffline}
              onChange={handleFormatChange}
              onBlur={handleBlur('format')}
            />
            Trực tuyến
          </label>
        </div>
      </fieldset>

      {isOffline ? (
        <TextField
          id="location"
          label="Địa điểm"
          name="location"
          value={values.location}
          onChange={handleTextChange('location')}
          onBlur={handleBlur('location')}
          error={showError('location')}
          required
        />
      ) : (
        <TextField
          id="link"
          label="Đường dẫn tham gia"
          name="link"
          type="url"
          value={values.link}
          onChange={handleTextChange('link')}
          onBlur={handleBlur('link')}
          error={showError('link')}
          placeholder="https://..."
          required
        />
      )}

      <TextField
        id="maxSeats"
        label="Số chỗ tối đa"
        name="maxSeats"
        type="number"
        value={values.maxSeats}
        onChange={handleTextChange('maxSeats')}
        onBlur={handleBlur('maxSeats')}
        error={showError('maxSeats')}
        required
      />

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting
          ? 'Đang lưu...'
          : mode === 'create'
            ? 'Thêm sự kiện'
            : 'Lưu thay đổi'}
      </button>
    </form>
  );
}