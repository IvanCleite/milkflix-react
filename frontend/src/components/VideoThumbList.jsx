import { Row, Col } from "react-bootstrap";
import useVideo from "../hooks/useVideo";
import { Link } from "react-router-dom";
import styles from "./VideoThumbList.module.css";
import useAuth from "../hooks/useAuth";

const VideoThumbList = () => {
  const { user } = useAuth()
  const { videoList, loading } = useVideo();
  if (loading) return <p>🔄 Carregando vídeos...</p>;

  if (Object.keys(videoList).length === 0) {
    return <h4 className={styles.message}>Não há vídeos para exibir! </h4>;
  }

  return (
    <Row className="g-5 ">
      {videoList.map((rec) => (
        <Col key={rec.id} xs={12} sm={6} md={4} lg={3}>
          <Link
            to={`/videoshow/${rec.id}`}
            state={{ rec }}
            className={styles.videoLink}
          >
            <div className={styles.imageContainer}>
              <img
                className="img-fluid rounded shadow"
                src={`/assets/images/${rec.id}-image.png`}
                alt={`Imagem do vídeo ${rec.id}-video.mp4`}
              />
              <div className={styles.titleOverlay}>
                <p className={styles.videoTitle}>{rec.title}</p>
              </div>
            </div>
          </Link>
          
          {user.role === 'adm' && (
            <Row className="d-flex justify-content-around">
            <Col>
              <Link
                to={`/videoedit/${rec.id}`}
                state={{ rec }}
                className="mt-1 fs-6 fst-italic fw-semibold btn btn-sm btn-outline-primary"
              >
                Editar
              </Link>
            </Col>
            <Col>
              <Link
                to={`/videodelete/${rec.id}`}
                state={{ rec }}
                className="mt-1 fs-6 fst-italic fw-semibold btn btn-sm btn-outline-danger"
              >
                Excluir
              </Link>
            </Col>
          </Row>
          )}
          

        </Col>
      ))}
    </Row>
  );
};

export default VideoThumbList;
