import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" }
})

export const insertUser = async (dataUser) => {
  try {
    const response = await api.post('/insert-user', { dataUser })
    return response.data;
    
  } catch (error) {
    const message = error.response?.data?.message || "Erro desconhecido";
    console.error("Erro ao enviar dados do usuário:", message);
  }
};

export const checkLogin = async (email, password) => {
  try {
    const response = await api.post('/check-login', { email, password });
    console.log('respnse.data no api.jsx: ', response.data)
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message || "Erro no Login" };
  }
};

// export const provisionalPassword = async ()=>{
//   const response = await axios.post(API_URL);
// }

export const getList = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados", error);
  }
};

export const insertVideo = async (dataVideo) => {
  const formData = new FormData();
  formData.append("video", dataVideo.video);
  formData.append("image", dataVideo.image);
  formData.append("title", dataVideo.formData.title);
  formData.append("modality", dataVideo.formData.modality);
  formData.append("origin", dataVideo.formData.origin);
  formData.append("instructions", dataVideo.formData.instructions);

  console.log("FormData enviado: ", [...formData.entries()]);

  try {
    const response = await api.post('/insert-video', { formData } );
    console.log("InserVideo: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar o vídeo:", error);
    throw error;
  }
};
