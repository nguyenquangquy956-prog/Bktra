import type { FieldBlurEvent, FieldChangeEvent } from '../types/form';

interface TextFieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (event: FieldChangeEvent) => void;
  onBlur: (event: FieldBlurEvent) => void;
  error?: string;
  type?: 'text' | 'date' | 'time' | 'number' | 'url';
  placeholder?: string;
  required?: boolean;
}

export function TextField({
  id,
  label,
  error,
  required = false,
  type = 'text',
  ...inputProps
}: TextFieldProps) {
  const errorId = `${id}-error`;
  const baseClass =
    'rounded-md border px-3 py-2 text-sm outline-none focus:ring-2';
  const stateClass = error
    ? 'border-red-500 focus:ring-red-200'
    : 'border-slate-300 focus:ring-indigo-200';

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        aria-invalid={Boolean(error)}
        aria-required={required}
        aria-describedby={error ? errorId : undefined}
        className={`${baseClass} ${stateClass}`}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}