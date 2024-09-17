// Import the necessary components
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
// Import the auth hook
import { useAuth } from "../../../../Contexts/AuthContext";
// Import the date-fns library
import { format } from "date-fns"; // To properly format the date on the table
// Import the getAllEmployees function
import {
  getAllCustomer,
} from "../../../../services/customer.service";


// import UpdateIcon from "@mui/icons-material/Update";
// import DeleteIcon from "@mui/icons-material/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

// Create the EmployeesList component
const CustomerList = () => {

  // Create the Customer state to store the Customer data
  const [customer, setCustomer] = useState([]);
  // A state to serve as a flag to show the error message
  const [apiError, setApiError] = useState(false);
  // A state to store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // To get the logged in employee token
  const { employee } = useAuth();
  let token = null; // To store the token
  if (employee) {
    token = employee.employee_token;
  }

  useEffect(() => {
    // Call the getAllEmployees function
    const allCustomer = getAllCustomer(token);
    allCustomer
      .then((res) => {
        if (!res.ok) {
          console.log(res.status);
          setApiError(true);
          if (res.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (res.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
        }
        return res.json();
      })
      .then((data) => {
        if (data.data.length !== 0) {
          setCustomer(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <>
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
              <div className="contact-title">
                <h2>Customers</h2>
              </div>
              {customer && (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Added Date</th>
                      <th>Active</th>
                      <th>Edit/View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer?.map((customer) => (
                      <tr key={customer.customer_id}>
                        <td>{customer.customer_id}</td>
                        <td>{customer.customer_first_name}</td>
                        <td>{customer.customer_last_name}</td>
                        <td>{customer.customer_email}</td>
                        <td>{customer.customer_phone_number}</td>
                        <td>
                          {format(
                            new Date(customer.customer_added_date),
                            "MM - dd - yyyy | kk:mm"
                          )}
                        </td>
                        <td>
                          {customer.active_customer_status ? "Yes" : "No"}
                        </td>
                        <td>
                          <Link
                            to={`/update-customer/${customer.customer_hash}`}
                          >
                            <button type="button">
                              <FontAwesomeIcon icon={faUserPen} />
                            </button>
                          </Link>
                          ||
                          <Link
                            to={`/customer-profile/${customer.customer_hash}`}
                          >
                            <button type="button">
                              <FontAwesomeIcon icon={faHandPointer} />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

// Export the CustomerList component
export default CustomerList;
