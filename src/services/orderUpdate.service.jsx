const api_url = import.meta.env.VITE_API_URL;

const updateServiceStatus = async (id, formData, token) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `${api_url}/api/servicestatus/${id}`,
    requestOptions
  );
  return response;
};

const updateSelectedService = async (id, formData, token) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `${api_url}/api/orderservice/${id}`,
    requestOptions
  );
  return response;
};

const updateNoteForInternal = async (id, formData, token) => {
  console.log(formData);

  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `${api_url}/api/internalnote/${id}`,
    requestOptions
  );
  return response;
};

const updateNoteForExternal = async (id, formData, token) => {
  console.log(formData);
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `${api_url}/api/externalnote/${id}`,
    requestOptions
  );
  return response;
};

const updateOrderStatus = async (id, formData, token) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `${api_url}/api/orderstatus/${id}`,
    requestOptions
  );
  return response;
};

export  {
  updateServiceStatus,
  updateSelectedService,
  updateNoteForInternal,
  updateNoteForExternal,
  updateOrderStatus,
};


