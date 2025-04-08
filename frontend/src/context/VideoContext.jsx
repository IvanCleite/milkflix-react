/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { getList } from "../services/Services";

// Criando o contexto
const VideoContext = createContext();

// Provedor do contexto
export const VideoProvider = ({ children }) => {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  // Função para buscar os vídeos (pode ser chamada novamente se necessário)
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const data = await getList();
      if (Array.isArray(data)) {  // Verifique se é um array
        setVideoList(data);
      } else {
        console.error("Erro: 'data' não é um array", data);
      }
    } catch (error) {
      console.error("Erro ao buscar a lista de vídeos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <VideoContext.Provider value={{ videoList, loading, fetchVideos }}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContext