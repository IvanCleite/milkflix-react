import { Routes, Route } from 'react-router-dom';
import {
  Home,
  VideoAdd,
  VideoShow,
  VideoEdit,
  VideoDelete,
  NotFound,
  Login,
  UserAdd,
  ForgotPassword
} from './pages';
import PrivateRoute from './components/PrivateRoutes';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/videoadd" element={<VideoAdd />} />
        <Route path="/videoedit/:id" element={<VideoEdit />} />
        <Route path="/videodelete/:id" element={<VideoDelete />} />
        <Route path="/videoshow/:id" element={<VideoShow />} />
        <Route path="/useradd" element={<UserAdd />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
