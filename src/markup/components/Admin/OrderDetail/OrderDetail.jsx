import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import { getOrderByHash } from "../../../../services/order.service";

function OrderDetail({ id }) {
  const [order, setOrder] = useState();
  const [serverError, setServerError] = useState("");
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderResponse = await getOrderByHash(id);
        if (!orderResponse.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const orderData = await orderResponse.json();

        if (orderData.length !== 0) {
          setOrder(orderData[0]);
        }
      } catch (error) {
        console.error(error);
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

    fetchOrder();
  }, [id]);

   const getStatusStyle = (status) => {
     switch (status) {
       case "Completed":
         return "completed";
       case "Pending":
         return "pending";
       case "In Progress":
         return "in-progress";
       case "Received":
         return "received";
       case "Canceled":
         return "canceled";
       default:
         return "";
     }
   };

 const orderStatus = order?.order_status || "";
 const statusColorClass = getStatusStyle(orderStatus);



  return (
    <div>
      <div className="order-detail-wrapper">
        <div className="name-status-holder">
          <div className="name-holder">
            <h3>
              {order?.customer_first_name + " "} {order?.customer_last_name}
            </h3>
          </div>
          <div className=""></div>
          <div className="orderUpdate-Holder">
            <div className={`status-holder ${statusColorClass} `}>
              <p> {order?.order_status}</p>
            </div>
          </div>
        </div>
        <p className="owner-value">
          {" "}
          {order?.customer_first_name}'s Order detail for {order?.vehicle_make + " "}
          {order?.vehicle_model}
        </p>
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
        {order && (
          <div className="requested-ser-wrapper">
            <div className="service-title-holder">
              <h4 className="Requested-holder"> Requested Service</h4>
            </div>

            <div className="service-list">
              {order?.services?.map((service) => (
                <div className="selected-services" key={service.service_id}>
                  <div className="service-name-disc">
                    <p className="service-name">{service?.service_Name}</p>
                    <p className="service-desc">{service?.service_dec}</p>
                    <p className={`status-holder ${statusColorClass}`}>
                      {service?.service_status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDetail;
