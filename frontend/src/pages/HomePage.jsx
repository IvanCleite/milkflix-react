import VideoThumbList from '../components/VideoThumbList';
import { Container } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import Login from './LoginPage';

const Home = () => {
  const { user } = useAuth();
  return user ? (
    <Container style={{ marginTop: '90px'}} >
      <VideoThumbList />
    </Container>
  ) : (
    <Login />
  );
};

export default Home;
