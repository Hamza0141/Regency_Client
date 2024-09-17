import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import { getOrderByHash } from "../../../../services/order.service";
import {
  updateServiceStatus,
  updateSelectedService,
  updateOrderStatus,
  updateNoteForInternal,
  updateNoteForExternal,
} from "../../../../services/orderUpdate.service";
import { getAllService } from "../../../../services/service.service";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function UpdateOrder({ id }) {
  const [order, setOrder] = useState();
  const [availableService, setAvailableService] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [serverError, setServerError] = useState();
  const [notesForInternal, setNotesForInternal] = useState(
    order?.notes_for_internal_use || ""
  );
  const [notesForCustomer, setNotesForCustomer] = useState(
    order?.notes_for_customer || ""
  );

  const [customerEditFlag, setCustomerEditFlag] = useState(false);
  const [internalEditFlag, setInternalEditFlag] = useState(false);
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;


  const navigator = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderResponse = await getOrderByHash(id);
        const availableServices = await getAllService(token);
        if (!orderResponse.ok) {
          throw new Error("Failed to fetch order");
        }
        const orderData = await orderResponse.json();
        const serviceData = await availableServices.json();

        if (orderData.length !== 0) {
          setOrder(orderData[0]);
        }
        if (serviceData.length !== 0) {
          setAvailableService(serviceData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, [id, token]);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

    const handleOrderStatusChange = (event) => {
      setSelectedOrderStatus(event.target.value);
    };

    const handleOrderStatusUpdate = async () => {
      if (!selectedOrderStatus) {
        console.error("Please select a status");
        return;
      }

      try {
        const formData = {
          order_status: selectedOrderStatus,
        };

        const response = await updateOrderStatus(id, formData);

        if (!response.ok) {
          throw new Error("Failed to update order status");
        }
        toast.success("Order status updated successfully");
          window.location.reload();
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    };

  const handleUpdateService = async (old_service_id) => {
  const isServiceAlreadyInOrder = order?.services?.some(
    (service) => Number(service.service_id) === Number(selectedService)
  );

  if (!selectedService) {
    toast.info("Service not selected");
    return;
  } else if (isServiceAlreadyInOrder) {
    toast.info("This service is already part of the order");
    return;
  }

    const formData = {
      service_id: old_service_id,
      new_service_id: selectedService,
    };

    try {
      const response = await updateSelectedService(
        id,
        formData,
        token
      );
      if (!response.ok) {
        throw new Error("Failed to update service");
      }
      toast.success("Service updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      setServerError("Error updating service.");
    }
  };

  const handleUpdateStatus = async (serviceId) => {
    console.log("Selected Status:", selectedStatus);
    if (!selectedStatus) {
     toast.info("status not changed");
      return;
    }
    const serviceStatus = selectedStatus;
    const formData = {
      serviceId,
      serviceStatus,
    };

    try {
      const response = await updateServiceStatus(
        id,
        [formData],
        token
      );
      if (!response.ok) {
        throw new Error("Failed to update ordered service status");
      }
      toast.success("Ordered service status updated successfully!");
      window.location.reload(); // Refresh the page after successful update
    } catch (error) {
      console.error(error);
      setServerError("Error updating service status.");
    }
  };

  const handleEditNotes = (field) => {
    console.log(field);
    if (field === "internal") {
      setNotesForInternal(order?.notes_for_internal_use || "");
      setCustomerEditFlag(false);
      setInternalEditFlag(true);
    } else if (field === "customer") {
      setNotesForCustomer(order?.notes_for_customer || "");
      setCustomerEditFlag(true);
      setInternalEditFlag(false);
    }
  };

const handleSaveNotes = async (field) => {
  try {
    if (field === "internal") {
      if (notesForInternal === order?.notes_for_internal_use) {
        // No change, do not update
        toast.info("No changes made to internal notes.");
        return;
      } else if (!notesForInternal) {
           toast.info("Empty value.");
           return;
      }
      const formData = {
        notes_for_internal_use: notesForInternal,
      };
      const internalResponse = await updateNoteForInternal(
        id,
        formData,
        token
      );
      if (!internalResponse.ok) {
        throw new Error("Failed to update internal notes");
      }
      toast.success("Internal notes updated successfully!");
      window.location.reload();
    } else if (field === "customer") {
      if (notesForCustomer === order?.notes_for_customer) {
        // No change, do not update
        toast.info("No changes made to customer notes.");
        return;
      }else if (!notesForCustomer) {
        toast.info("Empty value.");
        return;
      }
      const formData = {
        notes_for_customer: notesForCustomer,
      };
      const customerResponse = await updateNoteForExternal(
        id,
        formData,
        token
      );
      if (!customerResponse.ok) {
        throw new Error("Failed to update customer notes");
      }
      toast.success("Customer notes updated successfully!");
       window.location.reload();
    }
  } catch (error) {
    console.error(error);
    setServerError("Error updating notes.");
  }
};


  const getStatusColorClass = (status) => {
    switch (status) {
      case "Completed":
        return "completed";
      case "In Progress":
        return "in-progress";
      case "Pending":
        return "status-pending";
      case "Canceled":
        return "status-canceled";
      default:
        return "";
    }
  };

  const orderStatus = order?.order_status || "";
  const statusColorClass = getStatusColorClass(orderStatus);


  return (
    <div>
      <div className="order-detail-wrapper">
        <div className="name-status-holder">
          <div className="name-holder">
            <h3>
              {order?.customer_first_name + " "} {order?.customer_last_name}
            </h3>
          </div>
          <div className="orderUpdate-Holder">
            <div className={`status-holder ${statusColorClass}`}>
              <p> {order?.order_status}</p>
            </div>
            <button
              onClick={handleOrderStatusUpdate}
              className="btn-primary"
              style={{ color: "#101010" }}
            >
              Update Order Status
            </button>
            <select
              className="options"
              value={selectedOrderStatus}
              onChange={handleOrderStatusChange}
              disabled={order?.order_status == selectedOrderStatus}
            >
              <option value="" disabled>
                Select Status
              </option>
              <option
                value="Completed"
                disabled={order?.order_status === "Completed"}
              >
                Completed
              </option>
              <option
                value="In Progress"
                disabled={order?.order_status === "In Progress"}
              >
                In Progress
              </option>
              <option
                value="Pending"
                disabled={order?.order_status === "Pending"}
              >
                Pending
              </option>
              <option
                value="Canceled"
                disabled={order?.order_status === "Canceled"}
              >
                Canceled
              </option>
            </select>
          </div>
        </div>

        <div className="order-cus-vehicle">
          <div className="customer-data">
            <h3>
              {order?.customer_first_name + " "} {order?.customer_last_name}
            </h3>
            <div className="owner-Key-value">
              <p className="owner-Key">Email:</p>
              <p className="owner-value">{order?.customer_email}</p>
            </div>
            <div className="owner-Key-value">
              <p className="owner-Key">Phone:</p>
              <p className="owner-value">{order?.customer_phone_number}</p>
            </div>
            <div className="owner-Key-value">
              <p className="owner-Key">Active : </p>
              <p className="owner-value">
                {order?.active_customer_status ? "Yes" : "No"}
              </p>
            </div>
          </div>

          <div className="customer-vehicle-info">
            <h3>
              {order?.vehicle_make + " "}
              {order?.vehicle_model}
            </h3>
            <div className="owner-Key-value">
              <p className="owner-Key">Vehicle Tag:</p>
              <p className="owner-value">{order?.vehicle_tag}</p>
            </div>
            <div className="owner-Key-value">
              <p className="owner-Key">Vehicle Year:</p>
              <p className="owner-value">{order?.vehicle_year}</p>
            </div>
            <div className="owner-Key-value">
              <p className="owner-Key">Vehicle Milage :</p>
              <p className="owner-value">{order?.vehicle_mileage}</p>
            </div>
          </div>
        </div>

        {/* service column */}
        {order && (
          <div className="requested-ser-wrapper">
            <div className="service-title-holder">
              <h4 className="Requested-holder">Update Requested Service</h4>
            </div>

            <div className="ordered-service-list">
              {order?.services?.map((service) => (
                <div className="service-list-wrapper" key={service.vehicle_tag}>
                  <div className="service-list-container">
                    <p className="serviceName">{service?.service_Name}</p>
                    <p className="serviceDisc">{service?.service_dec}</p>
                    <p className="serviceDisc">{service?.service_status}</p>
                    <select onChange={handleServiceChange}>
                      <option value="">Select Service</option>
                      {availableService?.map((availableSer) => (
                        <option
                          key={availableSer.service_id}
                          value={availableSer.service_id}
                          disabled={order?.services?.some(
                            (ord) => ord.service_id === availableSer.service_id
                          )}
                        >
                          {availableSer.service_name}
                        </option>
                      ))}
                    </select>
                    <select onChange={handleStatusChange}>
                      <option value="">Select Status</option>
                      
                      <option
                        value="Completed"
                        disabled={service?.service_status === "Completed"}
                      >
                        Completed
                      </option>
                      <option
                        value="In Progress"
                        disabled={service?.service_status === "In Progress"}
                      >
                        In Progress
                      </option>
                      <option
                        value="Pending"
                        disabled={service?.service_status === "Pending"}
                      >
                        Pending
                      </option>
                    </select>
                    <button
                      onClick={() => handleUpdateService(service.service_id)}
                    >
                      Update Service
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(service.service_id)}
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* notes for internal use and customer holder start here */}
            <div className="ordered-service-list">
              <div className="service-list-wrapper">
                <div className="service-list-container">
                  <p className="serviceName">Note For Internal</p>
                  {internalEditFlag ? (
                    <textarea
                      value={notesForInternal}
                      onChange={(e) => setNotesForInternal(e.target.value)}
                      required
                    />
                  ) : (
                    <p className="owner-value">
                      {order?.notes_for_internal_use}
                    </p>
                  )}
                  <div className="editButton">
                    <button
                      type="button"
                      onClick={() => handleEditNotes("internal")}
                      required
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </div>

                  <p className="serviceName">Note For Customer</p>
                  {customerEditFlag ? (
                    <textarea
                      value={notesForCustomer}
                      onChange={(e) => setNotesForCustomer(e.target.value)}
                    />
                  ) : (
                    <p className="owner-value">{order?.notes_for_customer}</p>
                  )}

                  <div className="editButton">
                    <button
                      type="button"
                      onClick={() => handleEditNotes("customer")}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </div>

                  <button onClick={() => handleSaveNotes("internal")}>
                    Update Internal Note
                  </button>
                  <button onClick={() => handleSaveNotes("customer")}>
                    Update Customer Note
                  </button>
                </div>
              </div>
            </div>

            {/* additional note holder start here */}

            <div className="ordered-service-list">
              <div className="service-list-wrapper">
                <div className="owner-Key-value">
                  <p className="owner-Key">Customer Additional Request:</p>
                  <p className="owner-value">{order?.additional_request}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateOrder;
