import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { EventDetailPage } from './pages/EventDetailPage';
import { EventFormPage } from './pages/EventFormPage';
import { EventEditPage } from './pages/EventEditPage';
import { EventListPage } from './pages/EventListPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/su-kien" replace />} />
          <Route path="/su-kien" element={<EventListPage />} />
          <Route path="/su-kien/them-moi" element={<EventFormPage />} />
          <Route path="/su-kien/:id" element={<EventDetailPage />} />
          <Route path="/su-kien/:id/sua" element={<EventEditPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}