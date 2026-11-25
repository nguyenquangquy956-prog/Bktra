import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-6xl font-bold text-slate-300">404</p>
      <h1 className="text-2xl font-bold text-slate-900">Không tìm thấy trang</h1>
      <p className="text-slate-600">Đường dẫn bạn mở không tồn tại.</p>
      <Link
        to="/su-kien"
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Về danh sách sự kiện
      </Link>
    </section>
  );
}