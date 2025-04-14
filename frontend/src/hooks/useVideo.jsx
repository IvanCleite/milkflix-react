import { useContext } from 'react';
import VideoContext from '../contexts/videoContext';

// Hook customizado para facilitar o uso do contexto
const useVideo = () => {
  return useContext(VideoContext);
};

export default useVideo;
