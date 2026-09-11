import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
}

export default AppRouter;