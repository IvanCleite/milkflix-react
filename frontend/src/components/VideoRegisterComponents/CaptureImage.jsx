/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { Container, Button } from "react-bootstrap";
import styles from "./CaptureImage.module.css";

const CaptureImage = ({ videoSrc, image }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const OVERLAY_WIDTH = 300;
  const OVERLAY_HEIGHT = 200;

  const handleMouseDown = (event) => {
    if (videoRef.current) {
      const rect = videoRef.current.getBoundingClientRect();
      setDragging(true);

      setOffset({
        x: event.clientX - rect.left - position.x,
        y: event.clientY - rect.top - position.y,
      });
      event.preventDefault();
    }
  };

  const handleMouseMove = (event) => {
    if (!dragging || !videoRef.current) return;

    const rect = videoRef.current.getBoundingClientRect();

    let newX = event.clientX - rect.left - offset.x;
    let newY = event.clientY - rect.top - offset.y;

    newX = Math.max(0, Math.min(rect.width - OVERLAY_WIDTH, newX));
    newY = Math.max(0, Math.min(rect.height - OVERLAY_HEIGHT, newY));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const captureRegion = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    const rect = video.getBoundingClientRect();
    const offsetY = video.offsetTop;

    const scaleX = videoWidth / Math.round(rect.width);
    const scaleY = videoHeight / Math.round(rect.height);

    const sourceX = Math.round(position.x * scaleX);
    const sourceY = Math.round((position.y - offsetY) * scaleY);

    const sourceWidth = Math.round(OVERLAY_WIDTH * scaleX);
    const sourceHeight = Math.round(OVERLAY_HEIGHT * scaleY);

    canvas.width = OVERLAY_WIDTH;
    canvas.height = OVERLAY_HEIGHT;

    setTimeout(() => {
      ctx.drawImage(
        video,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        OVERLAY_WIDTH,
        OVERLAY_HEIGHT
      );
      // Retorna image para AdVideo.jsx com a imagem capturada
      image(canvas.toDataURL("image/png"));
    }, 50);
  };

  return (
    <Container className={`text-center mt-4 ${styles.container}`}>
      <h4>Vídeo selecionado</h4>
      <div
        className={`col-12 ${styles.divVideo}`}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <video
          className={`rounded-3 shadow ${styles.video}`}
          ref={videoRef}
          src={videoSrc}
          controls
        />

        <div
          className="rounded-3 col-12"
          onMouseDown={handleMouseDown}
          style={{
            position: "absolute",
            top: `${position.y}px`,
            left: `${position.x}px`,
            width: `${OVERLAY_WIDTH}px`,
            height: `${OVERLAY_HEIGHT}px`,
            border: "2px dashed red",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            cursor: "grab",
          }}
        />
        <Button
          className="mt-1 w-100 shadow text-primary-emphasis"
          style={{border: "2px dashed red", backgroundColor: "rgba(255, 0, 0, 0.2)", cursor: "grab" }}
          // variant="danger"
          onClick={captureRegion}
        >
          📷 Capturar imagem
        </Button>
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Container>
  );
};

export default CaptureImage;
