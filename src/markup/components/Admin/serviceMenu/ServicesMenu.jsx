import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import {
  getAllService,
  createService,
} from "../../../../services/service.service";
import { Table, Container, Row, Col } from "react-bootstrap";
import UpdateIcon from "@mui/icons-material/Update";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function ServicesMenu() {
  const [services, setServices] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    service_name: "",
    service_description: "",
  });

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  useEffect(() => {

    const fetchServices = async () => {
      try {
        const response = await getAllService(token);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error(error);
        setApiError(true);
        setApiErrorMessage("Error: " + error.message);
      }
    };

    fetchServices();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createService(
        formData,
        token
      );
              console.log(response);
      if (!response.ok) {
        console.log(response);
        toast.error(response.statusText);
        throw new Error("Failed to add service");
      }
      else if (response.status === 401) {
        setApiErrorMessage("Please login again");
      }

      toast.success("successfully added");
          window.location.reload(); 
      // Clear form data after successful update
      setFormData({
        service_name: "",
        service_description: "",
      });
      
      // navigator("/admin/services");
    } catch (error) {
      console.error(error);
      setApiError(true);
      setApiErrorMessage("Error: " + error.message);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <Container>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <Row>
                <Col>
                  <div className="contact-title">
                    <h2>Services we provide</h2>
                  </div>
                  {services && (
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Service Name</th>
                          <th>Service Description</th>
                          <th>Update</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((service) => (
                          <tr key={service.service_id}>
                            <td>{service.service_name}</td>
                            <td>{service.service_description}</td>
                            <td>
                              <div>
                                <Link
                                  to={`/update-service/${service.service_id}`}
                                >
                                  <button type="button">
                                    <UpdateIcon />
                                  </button>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Col>
              </Row>


              {employee.employee_role !== 1 && (
                <section className="contact-section">
                  <div className="auto-container">
                    <div className="contact-title">
                      <h2> Add New Service</h2>
                      <form style={{ width: "50%" }} onSubmit={handleSubmit}>
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
                          Create Service
                        </button>
                      </form>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </section>
        </>
      )}
      {/* {selectedServiceId && (
        <UpdateService serviceId={selectedServiceId} token={token} />
      )} */}
    </Container>
  );
}

export default ServicesMenu;
