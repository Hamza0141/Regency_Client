const api_url = import.meta.env.VITE_API_URL;

const getVehicleByCustomerId = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/vehicle/${id}`, requestOptions);

  return response;
};

const getVehicleByCustomerHashId = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/vehiclehash/${id}`, requestOptions);

  return response;
};

const getVehicleByVehicleId = async (vehicleId, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/api/vehicleid/${vehicleId}`,
    requestOptions
  );

  return response;
};

const addVehicle = async (formData, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
  return response;
};

const updateVehicle = async (id, formData, token) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/vehicle/${id}`, requestOptions);
  return response;
};




export  {
  getVehicleByCustomerId,
  getVehicleByCustomerHashId,
  addVehicle,
  updateVehicle,
  getVehicleByVehicleId,
};
 