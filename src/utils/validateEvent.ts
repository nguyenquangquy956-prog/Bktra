import type { EventFormErrors, EventFormValues, FormMode } from '../types/form';
import { getTodayISO } from './date';

const TITLE_MIN = 5;
const TITLE_MAX = 100;
const SEATS_MIN = 1;
const SEATS_MAX = 500;

const isValidHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export const validateEvent = (
  values: EventFormValues,
  mode: FormMode,
): EventFormErrors => {
  const errors: EventFormErrors = {};

  const title = values.title.trim();
  if (!title) {
    errors.title = 'Vui lòng nhập tên sự kiện.';
  } else if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
    errors.title = `Tên sự kiện phải từ ${TITLE_MIN} đến ${TITLE_MAX} ký tự.`;
  }

  if (!values.date) {
    errors.date = 'Vui lòng chọn ngày tổ chức.';
  } else if (mode === 'create' && values.date < getTodayISO()) {
    // So sánh chuỗi YYYY-MM-DD là đúng thứ tự thời gian
    errors.date = 'Ngày tổ chức không được là ngày trong quá khứ.';
  }

  if (!values.startTime) {
    errors.startTime = 'Vui lòng chọn giờ bắt đầu.';
  }

  if (!values.endTime) {
    errors.endTime = 'Vui lòng chọn giờ kết thúc.';
  } else if (values.startTime && values.endTime <= values.startTime) {
    errors.endTime = 'Giờ kết thúc phải sau giờ bắt đầu.';
  }

  if (values.format === 'offline') {
    if (!values.location.trim()) {
      errors.location = 'Vui lòng nhập địa điểm tổ chức.';
    }
  } else {
    const link = values.link.trim();
    if (!link) {
      errors.link = 'Vui lòng nhập đường dẫn tham gia.';
    } else if (!isValidHttpUrl(link)) {
      errors.link = 'Đường dẫn phải bắt đầu bằng http:// hoặc https://.';
    }
  }

  const seats = values.maxSeats.trim();
  if (!seats) {
    errors.maxSeats = 'Vui lòng nhập số chỗ tối đa.';
  } else if (!/^\d+$/.test(seats)) {
    errors.maxSeats = 'Số chỗ phải là số nguyên, không có dấu thập phân hay dấu âm.';
  } else if (Number(seats) < SEATS_MIN || Number(seats) > SEATS_MAX) {
    errors.maxSeats = `Số chỗ phải từ ${SEATS_MIN} đến ${SEATS_MAX}.`;
  }

  return errors;
};