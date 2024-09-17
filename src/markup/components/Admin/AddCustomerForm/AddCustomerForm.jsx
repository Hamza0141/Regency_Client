import React, { useState } from "react";
// import employee.service.js
import { createCustomerService } from "../../../../services/customer.service";
// Import the useAuth hook
import { useAuth } from "../../../../Contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

function AddCustomerForm(props) {
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone_number, setPhoneNumber] = useState("");
  // const [employee_password, setPassword] = useState("");
  const [active_customer_status, setActive_customer] = useState(1);
  const navigator = useNavigate();

  // Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  // Create a variable to hold the user's token
  let loggedInEmployeeToken = "";
  // Destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations
    let valid = true; // Flag
    // First name is required
    if (!customer_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }
    // Email is required
    if (!customer_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!customer_email.includes("@")) {
      setEmailError("Invalid email format");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(customer_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    if (!valid) {
      return;
    }
    const formData = {
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
    };
    console.log(formData);
    // Pass the form data to the service
    const newCustomer = createCustomerService(
      formData,
      loggedInEmployeeToken
    );
    newCustomer
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
      toast.success("successfully added");
      navigator("/admin/customers");
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
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new Customer</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      <input
                        type="email"
                        name="customer_email"
                        value={customer_email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Customer email"
                      />
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_first_name"
                        value={customer_first_name}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="Customer first name"
                      />
                      {firstNameRequired && (
                        <div className="validation-error" role="alert">
                          {firstNameRequired}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_last_name"
                        value={customer_last_name}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Customer last name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone_number"
                        value={customer_phone_number}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        placeholder="customer_phone (555-555-5555)"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Add Customer</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddCustomerForm;
