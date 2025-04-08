export const addressSearch = async (cep) => {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  console.log("entrou no address");

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("Endereço completo: ", data);

    if (data.erro) {
      return { erro: true }; // Retorna um erro caso o CEP não seja encontrado
    }

    return data; // Retorna o endereço completo
  } catch (error) {
    console.error("Erro ao buscar o CEP:", error);
    return null;
  }
};
