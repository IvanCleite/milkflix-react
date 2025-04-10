const formatCpf = (cpf) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
const formatCep = (cep) => cep.replace(/(\d{5})(\d{3})/, "$1-$2");
const formatTelefone = (telefone) => telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

console.log(formatCpf("12345678909")); // "123.456.789-09"
console.log(formatCep("12345678")); // "12345-678"
console.log(formatTelefone("11987654321")); // "(11) 98765-4321"
