/* eslint-disable react/prop-types */
import { Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SelectVideo = ({ video }) => {
  const navigate = useNavigate();
  // Carregar o vídeo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      video(url);
    }
  };

  return (
    <Col sm={12} md={6} className="mt-5">
      <h4>Selecione um Vídeo</h4>
      <Form.Group className="mt-3 mb-4">
        <Form.Control
          type="file"
          accept="video/*"
          autoFocus
          onChange={handleFileChange}
        />
      </Form.Group>
      <Button
        variant="outline-primary"
        className="mt-4 shadow w-100"
        onClick={() => navigate("/")}
      >
        Voltar para o início
      </Button>
    </Col>
  );
};

export default SelectVideo;
