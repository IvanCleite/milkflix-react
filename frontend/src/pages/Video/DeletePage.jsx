import { useLocation } from "react-router-dom";

const VideoDelete = () => {
    const location = useLocation();
    const rec = location.state?.rec;
    console.log("VideoDeletePage", rec.id);
  return (
    <div className="mt-5">
      <h3>VideoDeletePage: {rec.id}</h3>
      <a href="/" className="btn btn-warning mt-4 shadow w-100">
        Voltar para o início
      </a>
    </div>
  );
};

export default VideoDelete;
