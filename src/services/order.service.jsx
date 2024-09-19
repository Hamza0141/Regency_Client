const api_url = import.meta.env.VITE_API_URL;

const createOrder = async (orderData, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(orderData),
  };
  console.log("fom customer page " + requestOptions);
  const response = await fetch(`${api_url}/api/order`, requestOptions);
  return response;
};
const updateOrder = async (id, token, formData) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/order/${id}`, requestOptions);
  return response;
};

const getOrderByHash = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/order/${id}`, requestOptions);

  return response;
};

const getAllOrders = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/order`, requestOptions);
  return response;
};

const getOrderByCustomerHash = async (id, token) => {
  console.log(id, token);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/api/cutomerorder/${id}`,
    requestOptions
  );

  return response;
};

 export{
  createOrder,
  updateOrder,
  getOrderByHash,
  getAllOrders,
  getOrderByCustomerHash,
};

