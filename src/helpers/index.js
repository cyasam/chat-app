const formDataValTrim = (formData) => {
  const data = { ...formData };
  Object.keys(data).forEach((prop) => {
    data[prop] = data[prop].trim();
  });

  return data;
};

export default {
  formDataValTrim
};
