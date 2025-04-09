import axios from "axios";

const API_URL = "http://localhost:3001";

export const insertUser = async (dataUser) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/insert-user`,
      data: dataUser,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Erro desconhecido";
    console.error("Erro ao enviar dados do usuário:", message);
  }
};

export const checkLogin = async (userDataLogin) => {
  try {
    const response = await axios.post(`${API_URL}/check-login`, userDataLogin, {
      headers: {
        "Content-Type": "application/json",
      },
    });

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
    const response = await axios.get(API_URL);
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
    const response = await axios.post(`${API_URL}/insert-video`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("InserVideo: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar o vídeo:", error);
    throw error;
  }
};
