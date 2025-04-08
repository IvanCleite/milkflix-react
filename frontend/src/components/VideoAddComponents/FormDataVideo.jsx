/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";

const FormDataVideo = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="mt-5">
      <Form.Group controlId="formTitle">
        <Form.Label className="mb-0 fst-italic">Título</Form.Label>
        <Form.Control
          className="shadow"
          type="text"
          required
          name="title"
          value={formData.title}
          onChange={handleChange}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="formModality" className="mt-3">
        <Form.Label className="mb-0 fst-italic">Modalidade</Form.Label>
        <Form.Select
          required
          name="modality"
          className="shadow"
          value={formData.modality}
          onChange={handleChange}
        >
          <option value="">Selecione uma modalidade</option>
          <option value="Funcional">Funcional</option>
          <option value="Musculacao">Musculação</option>
          <option value="Boxe">Boxe</option>
          <option value="KungFu">KungFu</option>
          <option value="Natacao">Natação</option>
          <option value="Pilates">Pilates</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="formOrigin" className="mt-3">
        <Form.Label className="mb-0 fst-italic">Origem do vídeo</Form.Label>
        <Form.Select
          required
          name="origin"
          className="shadow"
          value={formData.origin}
          onChange={handleChange}
        >
          <option value="">Selecione a origem do vídeo</option>
          <option value="Local">Local</option>
          <option value="Youtube">Youtube</option>

        </Form.Select>
      </Form.Group>

      <Form.Group controlId="formInstructions" className="mt-3">
        <Form.Label className="mb-0 fst-italic">Instruções</Form.Label>
        <Form.Control
          as='textarea'
          rows={4}
          className="shadow"
          type="text"
          required
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
        ></Form.Control>
      </Form.Group>

    </div>
  );
};

export default FormDataVideo;
