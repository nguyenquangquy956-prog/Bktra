import axios from 'axios';

export const isNotFoundError = (error: unknown): boolean =>
  axios.isAxiosError(error) && error.response?.status === 404;

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Không kết nối được máy chủ. Hãy kiểm tra xem npm run api đã chạy chưa.';
    }
    if (error.response.status === 404) {
      return 'Không tìm thấy dữ liệu.';
    }
    return `Máy chủ trả về lỗi ${error.response.status}.`;
  }
  return 'Đã xảy ra lỗi không xác định.';
};