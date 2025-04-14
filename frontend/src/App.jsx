import { AppRoutes } from "./AppRoutes.jsx";
import AppNavbar from "./AppNavbar.jsx";
import useAuth from "./hooks/useAuth.jsx";
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <>
      <AppNavbar userName={user} />
      <AppRoutes />
    </>
  );
}

export default App;
