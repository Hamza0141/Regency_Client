import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import { getServiceById, updateService } from "../../../../services/service.service";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";

function UpdateService(id) {
  const [service, setService] = useState([]);
  const navigator = useNavigate();
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    service_name: "",
    service_description: "",
  });


  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    // Call the getAllEmployees function
    const fetchServices = async () => {
      try {
        const response = await getServiceById(
          id.serviceId,
          token
        );
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setService(data[0]);
      } catch (error) {
        console.error(error);
        setApiError(true);
        setApiErrorMessage("Error: " + error.message);
      }
    };

    fetchServices();
  }, [id.serviceId, token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateService(
        id.serviceId,
        token,
        formData
      );
      if (!response.ok) {
        toast.error(response.statusText);
        throw new Error("Failed to update service");

      }
      // Assuming response.json() contains the updated service data
      const data = await response.json();
      toast.success("success");
      // Clear form data after successful update
      setFormData({
        service_name: "",
        service_description: "",
      });
      navigator("/admin/services");
    } catch (error) {
      console.error(error);
      setApiError(true);
      setApiErrorMessage("Error: " + error.message);
    }
  };


return (
  <section>
    <div className="service-details" style={{ padding: "50px" }}>
      {apiError ? (
        <p>{apiErrorMessage}</p>
      ) : service ? (
        <>
          <h2 className="service-name">{service.service_name}</h2>
          <p className="service-description">{service.service_description}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                style={{ color: "black" }}
                placeholder="Service Name"
                type="text"
                className="form-control"
                id="service_name"
                name="service_name"
                value={formData.service_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                style={{ color: "black" }}
                placeholder="Service Description"
                className="form-control"
                id="service_description"
                name="service_description"
                value={formData.service_description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Update Service
            </button>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </section>
);

}

export default UpdateService;
