import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { getCustomerById } from "../../../../services/customer.service";
import {
  getVehicleByCustomerHashId,
  addVehicle,
} from "../../../../services/vehicle.service";
import { getOrderByCustomerHash } from "../../../../services/order.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faCartShopping,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faArrowUpRightFromSquare,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

function CustomerProfile({ id }) {
  const [singleCustomer, setSingleCustomer] = useState(null);
  const [vehicle, setVehicle] = useState();
  const [customerOrder, setCustomerOrder] = useState();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const navigator = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const [vehicleInfo, setVehicleInfo] = useState({
    customer_id: 0,
    vehicle_year: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_type: "",
    vehicle_mileage: "",
    vehicle_tag: "",
    vehicle_serial: "",
    vehicle_color: "",
  });

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  console.log(customerOrder);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Customer
        const customerResponse = await getCustomerById(
          id,
          token
        );
        if (!customerResponse.ok) {
          throw new Error("Failed to fetch Customer");
        }
        const customerData = await customerResponse.json();
        setSingleCustomer(customerData[0]);

        // Fetch Vehicles
        // const vehiclesResponse = await VehicleRequest.getVehicleByCustomerId(
        //   singleCustomer?.customer_id
        // );
        const vehiclesResponse = await getVehicleByCustomerHashId(id);
        if (!vehiclesResponse.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const vehicleData = await vehiclesResponse.json();
        if (vehicleData.length !== 0) {
          setVehicle(vehicleData);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch data.");
        setApiError(true);
        if (error.response && error.response.status === 401) {
          setApiErrorMessage("Please login again");
        } else if (error.response && error.response.status === 403) {
          setApiErrorMessage("You are not authorized to view this page");
        } else {
          setApiErrorMessage("Please try again later");
        }
      }
    };

    fetchData();
  }, [id, token]);


  useEffect(() => {
    if (singleCustomer && singleCustomer.customer_hash) {
      const fetchOrders = async () => {
        try {
          const orderResponse = await getOrderByCustomerHash(
            singleCustomer.customer_hash,
            token
          );
          if (!orderResponse.ok) {
            throw new Error("Failed to fetch Order");
          }
          const orderData = await orderResponse.json();
          if (orderData.length !== 0) {
            setCustomerOrder(orderData);
          }
        } catch (error) {
          console.error(error);
          toast.error("Failed to fetch orders.");
          setApiError(true);
          if (error.response && error.response.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (error.response && error.response.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
        }
      };

      fetchOrders();
    }
  }, [singleCustomer, token]);
  console.log(customerOrder);

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();

    setVehicleInfo((vehicleInfo.customer_id = singleCustomer?.customer_id));
    console.log(vehicleInfo);
    // Pass the form data to the service
    const newVehicle = addVehicle(vehicleInfo, token);
    newVehicle
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error);
        } else {
          // Handle successful response
          setSuccess(true);
          setServerError("");
          window.location.reload(); 
          toast.success("successfully added");
        }
      })
      // Handle Catch
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });
  };
  return (
    <div>
    
        <div className="icon-rightData">
          <div className="info-holder">
            <div className="icon-space">
              <div className="icon-holder">info</div>
            </div>
          </div>
          <div className="rightData">
            <h2 className="CustomerName">
              Customer: {singleCustomer?.customer_first_name + " "}
              {singleCustomer?.customer_last_name}
            </h2>
            <div className="cust_info">
              <p className="cust_Data_holder">Email :</p>
              <p className="cust_Data_value">
                {singleCustomer?.customer_email}{" "}
              </p>
            </div>
            <div className="cust_info">
              <p className="cust_Data_holder">Phone :</p>
              <p className="cust_Data_value">
                {singleCustomer?.customer_phone_number}{" "}
              </p>
            </div>
            <div className="cust_info">
              <p className="cust_Data_holder">Active:</p>
              <p className="cust_Data_value">
                {singleCustomer?.active_customer_status ? "Yes" : "No"}
              </p>
            </div>
            <div className="cust_info">
              <p className="cust_Data_holder">
                Edit Customer Info:
                <Link to={`/update-customer/${singleCustomer?.customer_hash}`}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    className="cust_Data_value"
                  />
                </Link>
              </p>
            </div>
          </div>
        </div>
    
      {vehicle && (
        <div className="icon-rightData">
          <div className="info-holder">
            <div className="icon-space">
              <div className="icon-holder">
                <FontAwesomeIcon icon={faCar} />
              </div>
            </div>
          </div>

          <div className="rightData">
            <h2>{singleCustomer?.customer_first_name}'s Vehicle</h2>
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
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {vehicle?.map((vehicle) => (
                  <tr key={vehicle.vehicle_id}>
                    <td>{vehicle.vehicle_year}</td>
                    <td>{vehicle.vehicle_make}</td>
                    <td>{vehicle.vehicle_model}</td>
                    <td>{vehicle.vehicle_tag}</td>
                    <td>{vehicle.vehicle_serial}</td>
                    <td>{vehicle.vehicle_color}</td>
                    <td>{vehicle.vehicle_mileage}</td>
                    <td>
                      <Link to={`/updatevehicle/${vehicle?.vehicle_id}`}>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ cursor: "pointer", marginRight: "10px" }}
                          className="cust_Data_value"
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}

      <div className="form-container">
        <button className="toggle-btn" onClick={toggleForm}>
          {showForm ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </button>
        <div className={`form-Wrapper rightData ${showForm ? "" : "hidden"}`}>
          {showForm && (
            <>
              <div className="new-form-wrapper">
                <div className="row clearfix">
                  <div className="form-column col-lg-7">
                    <h3>Add Vehicle</h3>
                    <div className="inner-column">
                      <div className="contact-form">
                        <form onSubmit={handleSubmit}>
                          <div className="row clearfix">
                            <div className="form-group col-md-12">
                              <input
                                type="number"
                                name="vehicle_year"
                                value={vehicleInfo.vehicle_year}
                                onChange={(event) =>
                                  setVehicleInfo({
                                    ...vehicleInfo,
                                    vehicle_year: event.target.value,
                                  })
                                }
                                placeholder="Year"
                              />
                            </div>

                            <div className="form-group col-md-12">
                              <input
                                type="text"
                                name="vehicle_make"
                                value={vehicleInfo.vehicle_make}
                                onChange={(event) =>
                                  setVehicleInfo({
                                    ...vehicleInfo,
                                    vehicle_make: event.target.value,
                                  })
                                }
                                placeholder="Make"
                              />
                            </div>

                            <div className="form-group col-md-12">
                              <input
                                type="text"
                                name="vehicle_model"
                                value={vehicleInfo.vehicle_model}
                                onChange={(event) =>
                                  setVehicleInfo({
                                    ...vehicleInfo,
                                    vehicle_model: event.target.value,
                                  })
                                }
                                placeholder="Model"
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <input
                                type="text"
                                name="vehicle_type"
                                value={vehicleInfo.vehicle_type}
                                onChange={(event) =>
                                  setVehicleInfo({
                                    ...vehicleInfo,
                                    vehicle_type: event.target.value,
                                  })
                                }
                                placeholder="Type"
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <input
                                type="number"
                                name="vehicle_mileage"
                                value={vehicleInfo.vehicle_mileage}
                                onChange={(event) =>
                                  setVehicleInfo({
                                    ...vehicleInfo,
                                    vehicle_mileage: event.target.value,
                                  })
                                }
                                placeholder="Mileage"
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <input
                                type="text"
                                name="vehicle_tag"
                                value={vehicleInfo.vehicle_tag}
                                onChange={(event) =>
                                  setVehicleInfo({
                                    ...vehicleInfo,
                                    vehicle_tag: event.target.value,
                                  })
                                }
                                placeholder="Tag"
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <input
                                type="text"
                                name="vehicle_serial"
                                value={vehicleInfo.vehicle_serial}
                                onChange={(event) =>
                                  setVehicleInfo({
                                    ...vehicleInfo,
                                    vehicle_serial: event.target.value,
                                  })
                                }
                                placeholder="Serial/VIN"
                              />
                            </div>

                            <div className="form-group col-md-12">
                              <input
                                type="text"
                                name="vehicle_color"
                                value={vehicleInfo.vehicle_color}
                                onChange={(event) =>
                                  setVehicleInfo({
                                    ...vehicleInfo,
                                    vehicle_color: event.target.value,
                                  })
                                }
                                placeholder="Color"
                              />
                            </div>

                            <div className="form-group col-md-12">
                              <button
                                className="btn btn-primary"
                                type="submit"
                                data-loading-text="Please wait..."
                              >
                                <span>Add Vehicle</span>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {customerOrder && (
        <div className="icon-rightData">
          <div className="info-holder">
            <div className="icon-space">
              <div className="icon-holder">
                <FontAwesomeIcon icon={faCartShopping} />
              </div>
            </div>
          </div>

          <div className="rightData">
            <h2>{singleCustomer?.customer_first_name}'s Order</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Order Date</th>
                  <th>Received By</th>
                  <th>Order Status</th>
                  <th>Edit/View</th>
                </tr>
              </thead>
              <tbody>
                {customerOrder?.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>
                      <div className="title-holder">
                        <h4 className="titleName">
                          {order.customer_first_name + " "}
                          {order.customer_last_name}
                        </h4>
                        <p>{order.customer_email}</p>
                        <p>{order.customer_phone_number}</p>
                      </div>
                    </td>
                    <td>
                      <div className="title-holder">
                        <h4 className="titleName">
                          {order.vehicle_make + " "}
                          {order.vehicle_model}
                        </h4>
                        <p>{order.vehicle_year}</p>
                        <p>{order.vehicle_tag}</p>
                      </div>
                    </td>
                    <td>{new Date(order.order_date).toLocaleString()}</td>
                    <td>
                      <p>
                        {order.employee_first_name + " "}
                        {order.employee_last_name}
                      </p>
                    </td>
                    <td>{order.order_status}</td>
                    <td>
                      <Link
                        to={`/admin/order/update_order/${order.order_hash}`}
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ cursor: "pointer", marginRight: "10px" }}
                        />
                      </Link>
                      <Link to={`/admin/order/detail/${order.order_hash}`}>
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          style={{ cursor: "pointer" }}
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerProfile;
