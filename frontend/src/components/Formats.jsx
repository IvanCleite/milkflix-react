export const formatCep = (value) => {
  value = value.replace(/\D/g, "");
  if (value.length <= 2) {
    value = `${value}`;
  } else if (value.length <= 5) {
    value = `${value.slice(0, 2)}.${value.slice(2)}`;
  } else {
    value = `${value.slice(0, 2)}.${value.slice(2, 5)}-${value.slice(5)}`;
  }
  return value;
};

export const formatCpf = (value) => {
  value = value.replace(/\D/g, "");
  if (value.length <= 3) {
    value = `${value}`;
  } else if (value.length <= 6) {
    value = `${value.slice(0, 3)}.${value.slice(3)}`;
  } else if (value.length <= 9) {
    value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
  } else {
    value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
  }
  return value;
};

export const formatPhone = (value) => {
  value = value.replace(/\D/g, "");

  if (value.length < 1) {
    value = "";
  } else if (value.length <= 2) {
    value = `(${value}`;
  } else if (value.length <= 7) {
    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  } else {
    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
  }
  
  return value;
};

