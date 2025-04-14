import VideoThumbList from '../components/VideoThumbList';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <Container style={{ marginTop: '90px' }}>
      <VideoThumbList />
    </Container>
  );
};

export default Home;
