import { AppRoutes } from "./routes/AppRoutes.jsx";
import AppNavbar from "./components/Navbar/AppNavbar.jsx";
import useAuth from "./hooks/useAuth.jsx";
import "./App.css";
// import VideoConverter from "./components/VideoConverter/VideoConverter.jsx";

function App() {
  const { user } = useAuth();

  return (
    <>
      {/* <VideoConverter /> */}
      <AppNavbar userName={user} />
      <AppRoutes />
    </>
  );
}

export default App;
