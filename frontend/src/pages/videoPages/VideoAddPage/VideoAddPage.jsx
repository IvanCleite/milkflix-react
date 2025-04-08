/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import { insertVideo } from "../../../services/Services";
import VideoSaved from "../../../components/Modals/VideoSaved";
import SelectVideo from "../../../components/VideoAddComponents/SelectVideo";
import CaptureImage from "../../../components/VideoAddComponents/CaptureImage";
import FormDataVideo from "../../../components/VideoAddComponents/FormDataVideo";

// Função para converter base64 em Blob
const base64ToBlob = (base64, mimeType) => {
  let byteCharacters = atob(base64.split(",")[1]);
  let byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }

  return new Blob([new Uint8Array(byteArrays)], { type: mimeType });
};

const VideoAdd = () => {
  const navigate = useNavigate();

  console.log("usuário logado", sessionStorage.getItem("user"));
  // alert('*************')

  const [videoSrc, setVideoSrc] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    modality: "",
    origin: "",
    instructions: "",
  });
  const [saved, setSaved] = useState(false);

  const handleSelectOther = () => {
    setVideoSrc(null);
    setImage(null);
  };

  const handleInsertVideo = async () => {
    // Convertendo Blob URL para File
    const videoBlob = await fetch(videoSrc).then((res) => res.blob());
    const videoFile = new File([videoBlob], "video.mp4", {
      type: videoBlob.type,
    });

    // Convertendo imagem Base64 para File
    const imageBlob = base64ToBlob(image, "image/png");
    const imageFile = new File([imageBlob], "image.png", {
      type: "image/png",
    });

    const dataVideo = {
      video: videoFile,
      image: imageFile,
      formData: formData,
    };
    insertVideo(dataVideo);
    setSaved(true);
  };

  return (
    <Container className="mt-5">
      <Row className="d-flex justify-content-center align-items-center">
        {!videoSrc && <SelectVideo video={setVideoSrc} />}

        {videoSrc && (
          <Col sm={12} lg={4}>
            <CaptureImage videoSrc={videoSrc} image={setImage} />
          </Col>
        )}

        {image && (
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
                style={{ maxWidth: "100%" }}
              />
            </div>
          </Col>
        )}
        {image && (
          <Col className="ms-5">
            <h4>Dados do vídeo</h4>
            <FormDataVideo formData={formData} setFormData={setFormData} />
          </Col>
        )}
      </Row>

      <Row className="mt-2 d-flex align-items-center">
        {videoSrc && (
          <Col>
            <Button
              onClick={handleSelectOther}
              className="btn btn-danger mt-4 w-75 shadow"
            >
              Descartar e Selecionar outro vídeo
            </Button>
          </Col>
        )}

        {videoSrc && (
          <Col>
            <Button
              variant="primary"
              className="mt-4 shadow w-100"
              onClick={() => navigate("/")}
            >
              Voltar para o início
            </Button>
            {/* <a href="/" className="btn btn-warning mt-4 w-75 shadow">
              Descartar e voltar para o início
            </a> */}
          </Col>
        )}

        {image && (
          <Col>
            <Button
              onClick={handleInsertVideo}
              className="btn btn-success mt-4 w-75 shadow"
            >
              Salvar
            </Button>
          </Col>
        )}
      </Row>
      <VideoSaved show={saved} handleClose={() => setSaved(false)} />
    </Container>
  );
};

export default VideoAdd;
