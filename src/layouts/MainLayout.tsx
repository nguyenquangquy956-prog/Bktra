import { NavLink, Outlet } from 'react-router-dom';

const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
  `rounded-md px-3 py-2 text-sm font-medium ${
    isActive
      ? 'bg-indigo-600 text-white'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`;

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <span className="text-lg font-bold text-slate-900">Quản lý sự kiện CLB</span>
          <nav className="flex gap-2">
            <NavLink to="/su-kien" className={navLinkClass}>
              Danh sách
            </NavLink>
            <NavLink to="/su-kien/them-moi" className={navLinkClass}>
              Thêm mới
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 text-center text-sm text-slate-500">
          Bài tập lớn React CRUD · Quản lý sự kiện câu lạc bộ
        </div>
      </footer>
    </div>
  );
}