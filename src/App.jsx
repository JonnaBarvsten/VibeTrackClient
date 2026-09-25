import LoginPage from './pages/login/LoginPage';
import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/register/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import NotFoundPage from './pages/notFound/NotFoundPage';

export default function App() {

  return (
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/dashboard' element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  )
}
