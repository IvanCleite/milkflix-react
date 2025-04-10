import { Routes, Route } from "react-router-dom";
import {
  Home,
  VideoAdd,
  VideoShow,
  VideoEdit,
  VideoDelete,
  NotFound,
  Login,
  UserAdd,
} from "./pages";
import PrivateRoute from "./components/PrivateRoutes";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/videoadd" element={<VideoAdd />} />
        <Route path="/videoedit/:id" element={<VideoEdit />} />
        <Route path="/videodelete/:id" element={<VideoDelete />} />
        <Route path="/videoshow/:id" element={<VideoShow />} />
        <Route path="/useradd" element={<UserAdd />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
