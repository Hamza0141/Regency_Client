import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import { getCustomerById,updateCustomer } from "../../../../services/customer.service";  
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";


function UpdateCustomer({id}) {
      const [singleCustomer, setSingleCustomer] = useState(null);
      const [customer_first_name, setFirstName] = useState("");
      const [customer_last_name, setLastName] = useState("");
      const [customer_phone_number, setPhoneNumber] = useState("");
      const [active_customer_status, setActive_customer] = useState("active"); // Default: active
      const [firstNameRequired, setFirstNameRequired] = useState("");
      const [serverError, setServerError] = useState("");
      const navigator = useNavigate();

      const { employee } = useAuth();
      const token = employee ? employee.employee_token : null;


        useEffect(() => {
          const fetchCustomer = async () => {
            try {
              const response = await getCustomerById(id, token);
              if (!response.ok) {
                throw new Error("Failed to fetch customer");
              }
              const data = await response.json();
              setSingleCustomer(data[0]);
              setFirstName(data[0]?.customer_first_name || "");
              setLastName(data[0]?.customer_last_name || "");
              setPhoneNumber(data[0]?.customer_phone_number || "");
              setActive_customer(
                data[0]?.active_customer_status === "1" ? "active" : "inactive"
              );
            } catch (error) {
              console.error(error);
              toast.error("Failed to fetch customer details.");
            }
          };

          fetchCustomer();
        }, [id, token]);



          const handleSubmit = async (e) => {
            e.preventDefault();

            // Client-side validations
            if (!customer_first_name) {
              setFirstNameRequired("First name is required");
              return;
            }

            const formData = {
              customer_first_name,
              customer_last_name,
              customer_phone_number,
              active_customer_status:
                active_customer_status === "active" ? 1 : 0,
            };

            try {
              const response = await updateCustomer(
                id,
                token,
                formData
              );
              if (!response.ok) {
                throw new Error("Failed to update customer");
              }
              toast.success("Customer updated successfully!");
                navigator("/admin/customers");
              
              // navigator("/admin/employees"); // Redirect
            } catch (error) {
              console.error(error);
              setServerError("Error updating Customer.");
            }
          };



  return (
    <section>
      <div>
        {singleCustomer ? (
          <>
            <section className="contact-section">
              <div className="auto-container">
                <div className="contact-title">
                  <h2>
                    Edit: {singleCustomer?.customer_first_name + " "}
                    {singleCustomer?.customer_last_name}
                  </h2>
                  <br />
                  <h3>Email:{singleCustomer?.customer_email}</h3>
                </div>
              </div>
              <div className="row clearfix">
                <div className="form-column col-lg-7">
                  <div className="inner-column">
                    <div className="contact-form">
                      <form onSubmit={handleSubmit}>
                        <div className="row clearfix">
                          <div className="form-group col-md-12">
                            <input
                              type="text"
                              name="customer_first_name"
                              value={customer_first_name}
                              onChange={(event) =>
                                setFirstName(event.target.value)
                              }
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
                              onChange={(event) =>
                                setLastName(event.target.value)
                              }
                              placeholder="Customer last name"
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <input
                              type="text"
                              name="customer_phone_number"
                              value={customer_phone_number}
                              onChange={(event) =>
                                setPhoneNumber(event.target.value)
                              }
                              placeholder="Customer phone (555-555-5555)"
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <select
                              value={active_customer_status}
                              onChange={(event) =>
                                setActive_customer(event.target.value)
                              }
                              className="custom-select-box"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>

                          <div className="form-group col-md-12">
                            <button
                              className="btn btn-primary"
                              type="submit"
                              data-loading-text="Please wait..."
                            >
                              <span>Update</span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
}

export default UpdateCustomer