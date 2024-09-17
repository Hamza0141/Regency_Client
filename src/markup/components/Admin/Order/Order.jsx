import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getAllCustomer } from "../../../../services/customer.service";
import {getAllService} from "../../../../services/service.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointer,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";
import { getVehicleByCustomerId } from "../../../../services/vehicle.service";
import { createOrder } from "../../../../services/order.service";
import { getAllEmployees } from "../../../../services/employee.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Order() {
  const [customer, setCustomer] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [singleCustomer, setSingleCustomer] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [availableService, setAvailableService] = useState([]);
  const [customerFlag, setCustomerFlag] = useState(true);
  const [availableEmployee, setAvailableEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [additionalRequests, setAdditionalRequests] = useState({
    additional_request: "",
    price: 0,
  });

  const navigator = useNavigate();

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerResponse = await getAllCustomer(token);
        const serviceResponse = await getAllService(token);
         const availableEmployee = await getAllEmployees(token);
        if (!customerResponse.ok || !serviceResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        const customerData = await customerResponse.json();
        const serviceData = await serviceResponse.json();
        const employeeData = await availableEmployee.json();
        setCustomer(customerData.data);
        setAvailableService(serviceData);
        setAvailableEmployee(employeeData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredCustomer = customer.filter((cust) =>
    Object.values(cust).some((val) =>
      val.toString().toLowerCase().includes(searchInput.toLowerCase())
    )
  );

  const getSingleCustomer = async (id) => {
    try {
      const sortedCustomer = customer.find((c) => c.customer_id === id);
      setSingleCustomer(sortedCustomer);
      setCustomerFlag(false);
      const vehicleResponse = await getVehicleByCustomerId(
        id,
        token
      );
      if (!vehicleResponse.ok) {
        throw new Error("Failed to fetch Vehicle");
      }
      const vehicleData = await vehicleResponse.json();
      setVehicle(vehicleData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch customer details.");
    }
  };

  const selectVehicle = (vehicleId) => {
    const selectedVehicle = vehicle.find((v) => v.vehicle_id === vehicleId);
    setSelectedVehicle(selectedVehicle);
  };

const selectedServices = (serviceID) => {
  // Check if the serviceId is already in the array
  const index = selectedServiceIds.indexOf(serviceID);
  if (index === -1) {
    // If not present, add it to the array
    setSelectedServiceIds((prevIds) => [...prevIds, serviceID]);
  } else {
    // If present, remove it from the array
    setSelectedServiceIds((prevIds) => prevIds.filter((id) => id !== serviceID));
  }
  console.log(selectedServiceIds);
};
const handleEmployeeChange = (event) => {
  setSelectedEmployee(event.target.value);
};

  const handleSubmitOrder = () => {
 if (!selectedServiceIds || selectedServiceIds.length === 0) {
   // If no services are selected, display an error message
   toast.error("Please select at least one service.");
   return; // Stop further execution
 }
 if (!selectedEmployee || selectedEmployee.length === 0) {
   // If no services are selected, display an error message
   toast.error("Please assign to employee.");
   return; // Stop further execution
 }
    const orderData = {
      employee_id: employee.employee_id,
      customer_id: singleCustomer.customer_id,
      vehicle_id: selectedVehicle?.vehicle_id,
      order_total_price: additionalRequests.price,
      additional_request: additionalRequests.additional_request,
      service_ids: selectedServiceIds,
      assigned_employee_id: selectedEmployee,
      order_status: "Received",
      service_status: "In Progress",
    };
    console.log(orderData);

    // Call the service to create the order
    createOrder(orderData, token)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create order");
        }
      })
      .then((data) => {
        // Handle success
        toast.success("Order created successfully.");
        navigator("/admin/orders");
        // Reset form fields or navigate to another page
      })
      .catch((error) => {
        // Handle error
        console.error("Error creating order:", error);
        toast.error("Failed to create order.");
      });
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Create New Order</h2>
        </div>

        {/* Display search input and customer list */}
        {!selectedVehicle && !singleCustomer && (
          <div className="contact-form">
            <div className="row clearfix">
              <div className="form-group col-md-12">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by First name, Last name, Phone, Email"
                />
                {searchInput && customerFlag && (
                  <Table striped bordered hover>
                    <tbody>
                      {filteredCustomer?.map((cust) => (
                        <tr key={cust.customer_id}>
                          <td>{cust.customer_first_name}</td>
                          <td>{cust.customer_last_name}</td>
                          <td>{cust.customer_email}</td>
                          <td>{cust.customer_phone_number}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                getSingleCustomer(cust.customer_id)
                              }
                            >
                              <FontAwesomeIcon icon={faHandPointer} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
                {!searchInput && (
                  <Link to="/admin/add-customer">
                    <button
                      className="btn btn-primary"
                      type="button"
                      data-loading-text="Please wait..."
                    >
                      Add New Customer
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Display selected customer */}
        {singleCustomer && (
          <div className="customerInfo">
            <h3>
              {singleCustomer.customer_first_name + " "}
              {singleCustomer.customer_last_name}
            </h3>
            <div className="cust-Key-value">
              <p className="cust-Key">Email:</p>
              <p className="cust-value">{singleCustomer.customer_email}</p>
            </div>
            <div className="cust-Key-value">
              <p className="cust-Key">Phone:</p>
              <p className="cust-value">
                {singleCustomer.customer_phone_number}
              </p>
            </div>
            <div className="cust-Key-value">
              <p className="cust-Key">Active :</p>
              <p className="cust-value">
                {singleCustomer.active_customer_status ? "Yes" : "No"}
              </p>
            </div>
            <div className="cust-Key-value">
              <p className="cust-Key">Edit :</p>
              <Link to={`/update-customer/${singleCustomer?.customer_hash}`}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ cursor: "pointer", marginRight: "10px" }}
                  className="cust_Data_value"
                />
              </Link>
            </div>
          </div>
        )}

        {/* Display selected vehicle */}
        {selectedVehicle && (
          <div className="SelectedVehicleInfo">
            <h3>{selectedVehicle.vehicle_make}</h3>
            <div className="cust-Key-value">
              <p className="cust-Key">Color:</p>
              <p className="cust-value">{selectedVehicle?.vehicle_color}</p>
            </div>
            <div className="cust-Key-value">
              <p className="cust-Key">Tag:</p>
              <p className="cust-value">{selectedVehicle?.vehicle_tag}</p>
            </div>
            <div className="cust-Key-value">
              <p className="cust-Key">Year:</p>
              <p className="cust-value">{selectedVehicle?.vehicle_year}</p>
            </div>
            <div className="cust-Key-value">
              <p className="cust-Key">Milage:</p>
              <p className="cust-value">{selectedVehicle?.vehicle_mileage}</p>
            </div>
            <div className="cust-Key-value">
              <p className="cust-Key">VIN:</p>
              <p className="cust-value">{selectedVehicle?.vehicle_serial}</p>
            </div>
            <div className="cust-Key-value">
              <p className="cust-Key">Edit :</p>
              <td>
                <Link to={`/updatevehicle/${selectedVehicle?.vehicle_id}`}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    className="cust_Data_value"
                  />
                </Link>
              </td>
              <p className="cust-value"></p>
            </div>
          </div>
        )}

        {/* Display available services */}
        {selectedVehicle && (
          <div className="service-wrapper">
            <h3 className="title-header">Choose Service</h3>
            {availableService.map((service) => (
              <div className="services" key={service.service_id}>
                <div className="service-Key-value">
                  <p className="service-Key">{service.service_name}</p>
                  <p className="service-value">{service.service_description}</p>
                </div>
                <div className="checkbox-wrapper">
                  <input
                    className="form-checkbox"
                    type="checkbox"
                    onClick={() => selectedServices(service.service_id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Display additional request */}
        {selectedVehicle && (
          <div className="additional_request">
            <h3 className="title-header">Additional Requests</h3>
            <div className="inputs">
              <div className="additional_request_input">
                <textarea
                  type="text"
                  value={additionalRequests.additional_request} // Set value to state value
                  onChange={(e) =>
                    setAdditionalRequests((prev) => ({
                      ...prev,
                      additional_request: e.target.value,
                    }))
                  }
                  placeholder="Additional Request"
                />
              </div>
              <div className="priceInput">
                <input
                  type="number"
                  value={additionalRequests.price}
                  onChange={(e) =>
                    setAdditionalRequests((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  placeholder="Price"
                />
              </div>
            </div>
            <div className="form-group col-md-12 employeeSelection">
              <h3 className="title-header">Assign To Employee</h3>
              <select
                name="company_role"
                value={selectedEmployee}
                onChange={handleEmployeeChange}
                className="custom-select-box"
              >
                <option value="" disabled>
                  Select an employee
                </option>
                {availableEmployee.map((employee) => (
                  <option
                    key={employee.employee_id}
                    value={employee.employee_id}
                  >
                    {`${employee.employee_first_name} ${employee.employee_last_name}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="submitBotton">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSubmitOrder}
                data-loading-text="Please wait..."
              >
                SUBMIT ORDER
              </button>
            </div>
          </div>
        )}

        {/* Display vehicle information */}
        {!selectedVehicle && vehicle && (
          <div className="vehicleInfo">
            <h2>Vehicle Information</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Tag</th>
                  <th>Serial</th>
                  <th>Color</th>
                  <th>Mileage</th>
                  <th>Choose</th>
                </tr>
              </thead>

              <tbody>
                {vehicle.map((v) => (
                  <tr key={v.vehicle_id}>
                    <td>{v.vehicle_year}</td>
                    <td>{v.vehicle_make}</td>
                    <td>{v.vehicle_model}</td>
                    <td>{v.vehicle_tag}</td>
                    <td>{v.vehicle_serial}</td>
                    <td>{v.vehicle_color}</td>
                    <td>{v.vehicle_mileage}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => selectVehicle(v.vehicle_id)}
                      >
                        <FontAwesomeIcon icon={faHandPointer} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Order;
