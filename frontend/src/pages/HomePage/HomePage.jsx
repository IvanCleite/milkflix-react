import VideoThumbList from "../../components/VideoThumbList/VideoThumbList";
import { Container } from "react-bootstrap";
import styles from "./HomePage.module.css";
import useAuth from "../../hooks/useAuth";
import Login from "../LoginPage/LoginPage";

const Home = () => {
  const { user } = useAuth();
  return user ? (
    <Container className={`${styles.container}`}>
      <VideoThumbList />
    </Container>
  ) : (
    <Login />
  );
};

export default Home;
