import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import useModalActions from "../../hooks/useModalActions";
import styles from "./ShowPage.module.css";

const VideoShow = () => {
  const { goToRoute } = useModalActions()
  const location = useLocation();
  const rec = location.state?.rec;

  if (!rec) {
    return <p>Dados do vídeo não encontrados.</p>;
  }

  return (
    <Container className="mt-5">
      <Row className={styles.rowVideo}>
        <Col xs={12} className={styles.colVideo}>
          <p className={`${styles.fontTitle}`}>{rec.title}</p>
          <p className={`${styles.fontModality}`}>{rec.modality}</p>
          <video className="img-fluid rounded-3 shadow" controls autoPlay>
            <source src={`/assets/videos/${rec.id}-video.mp4`} type="video/mp4" />
            Seu navegador não suporta a tag de vídeo.
          </video>
        </Col>

        <Row className={styles.rowInstructions}>
          <p className={`${styles.fontInstructions} mt-3`}>{rec.instructions}</p>
        </Row>

        <Col xs={8} sm={6} md={4} lg={4}>
        {goToRoute('/home', 'fechar', 'outline-secondary')}
        </Col>
      </Row>
    </Container>
  );
};

export default VideoShow;
