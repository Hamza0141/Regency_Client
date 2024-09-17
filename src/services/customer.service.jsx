const api_url = import.meta.env.VITE_API_URL;

const createCustomerService = async (formData, loggedInEmployeeToken) => {
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
  const response = await fetch(`${api_url}/api/customer`, requestOptions);
  return response;
};

const getAllCustomer = async (token) => {
  // console.log(token);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/customer`, requestOptions);
  return response;
};

const getCustomerById = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/customer/${id}`, requestOptions);

  return response;
};

const updateCustomer = async (id, token, formData) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };
  console.log(formData);
  const response = await fetch(`${api_url}/api/customer/${id}`, requestOptions);
  return response;
};

export {
  createCustomerService,
  getAllCustomer,
  getCustomerById,
  updateCustomer,
};
