/* eslint-disable no-unused-vars */
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import CaptureImage from '../../components/VideoRegisterComponents/CaptureImage';
import FormDataVideo from '../../components/VideoRegisterComponents/Form';

const VideoEdit = () => {
  const location = useLocation();
  const rec = location.state?.rec;
  console.log('EditPage', rec.id);

  const [videoSrc, setVideoSrc] = useState(
    `/assets/videos/${rec.id}-video.mp4`
  );

  const [image, setImage] = useState(`/assets/images/${rec.id}-image.png`);
  const [formData, setFormData] = useState({
    title: rec.title,
    modality: rec.modality,
    origin: rec.origin,
    instructions: rec.instructions,
  });
  const [saved, setSaved] = useState(false);

  return (
    <Container className="mt-5">
      <Row className="d-flex justify-content-center align-items-center">
        <Col sm={12} lg={4}>
          <CaptureImage videoSrc={videoSrc} image={setImage} />
        </Col>
        <Col sm={12} lg={4} className="ms-5">
          <div>
            <h4>Imagem Capturada</h4>
            <h6 className="mb-5 fst-italic">
              (você pode capturar outra imagem se desejar)
            </h6>
            <img
              className="rounded-3 shadow"
              src={image}
              alt="Captura"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </Col>
        <Col className="ms-5">
          <h4>Dados do vídeo</h4>
          <FormDataVideo formData={formData} setFormData={setFormData} />
        </Col>
        <Row className="mt-4">
          <Col sm={12} lg={6}>
            <a href="/home" className="btn btn-warning mt-4 shadow w-100">
              Voltar para o início
            </a>
          </Col>
          <Col sm={12} lg={6}>
            <a href="/home" className="btn btn-success mt-4 shadow w-100">
              Salvar alterações
            </a>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default VideoEdit;
