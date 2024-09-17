const api_url = import.meta.env.VITE_API_URL;

const createService = async (formData, loggedInEmployeeToken) => {
  console.log("fom customer page " + formData);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  console.log("fom customer page " + requestOptions);
  const response = await fetch(`${api_url}/api/service`, requestOptions);
  return response;
};

const getAllService = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/services`, requestOptions);
  return response;
};

const getServiceById = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/service/${id}`, requestOptions);

  return response;
};

const updateService = async (id, token, formData) => {
  console.log(formData);
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/service/${id}`, requestOptions);
  return response;
};
const deleteService = async (id, token) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/service/${id}`, requestOptions);
  return response;
};

// const serviceRequest = {
//   createService,
//   getAllService,
//   updateService,
//   getServiceById,
//   deleteService,
// };
// export default serviceRequest;

export {
  createService,
  getAllService,
  updateService,
  getServiceById,
  deleteService,
};
