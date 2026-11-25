import type { ChangeEvent, FocusEvent } from 'react';
import type { EventFormat } from './event';

export interface EventFormValues {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  format: EventFormat;
  location: string;
  link: string;
  maxSeats: string;
}

export type EventFormErrors = Partial<Record<keyof EventFormValues, string>>;

export type TouchedFields = Record<keyof EventFormValues, boolean>;

export type FormMode = 'create' | 'edit';

export type FieldChangeEvent = ChangeEvent<HTMLInputElement>;

export type FieldBlurEvent = FocusEvent<HTMLInputElement>;