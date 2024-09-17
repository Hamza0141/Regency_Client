import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../../../services/order.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders(token);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch order details.");
      }
    };

    fetchOrders();
  }, [token]);

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

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Orders</h2>
          {orders && orders.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Order Date</th>
                  <th>Received By</th>
                  <th>Assigned To</th>
                  <th>Order Status</th>
                  <th>Edit/View</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
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
                    <td>
                      <p>
                        {order.assigned_employee_first_name + " "}
                        {order.assigned_employee_last_name}
                      </p>
                    </td>
                    <td>
                      <span
                        className={`order-status ${getStatusStyle(
                          order.order_status
                        )}`}
                      >
                        {order.order_status}
                      </span>
                    </td>
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
          )}
        </div>
      </div>
    </section>
  );
}

export default Orders;
