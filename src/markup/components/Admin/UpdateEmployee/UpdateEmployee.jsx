import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import {
  getEmployeeById,
  resetEmployeePassword,
  updateEmployee,
} from "../../../../services/employee.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

function UpdateEmployee({ id }) {
  const [singleEmployee, setSingleEmployee] = useState(null);
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [company_role_id, setCompany_role_id] = useState("1");
  const [active_employee, setActive_employee] = useState("active"); // Default: active
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false); // State to manage visibility of reset password field
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigator = useNavigate();

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeById(id, token);
        if (!response.ok) {
          throw new Error("Failed to fetch employee");
        }
        const data = await response.json();
        setSingleEmployee(data[0]);
        setFirstName(data[0]?.employee_first_name || "");
        setLastName(data[0]?.employee_last_name || "");
        setPhoneNumber(data[0]?.employee_phone || "");
        setCompany_role_id(data[0]?.company_role_id || "1");
        setActive_employee(
          data[0]?.active_employee === "1" ? "active" : "inactive"
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch employee details.");
      }
    };

    fetchEmployee();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validations
    if (!employee_first_name) {
      setFirstNameRequired("First name is required");
      return;
    }

    const formData = {
      employee_first_name,
      employee_last_name,
      employee_phone,
      company_role_id,
      active_employee: active_employee === "active" ? 1 : 0,
    };

    try {
      const response = await updateEmployee(
        id,
        token,
        formData
      );
      if (!response.ok) {
        throw new Error("Failed to update employee");
      }
      toast.success("Employee updated successfully!");
        navigator("/admin/employees");
    } catch (error) {
      console.error(error);
      setServerError("Error updating employee.");
    }
  };
  // Function to handle password reset
  const handleToggle = async () => {
    setShowResetPassword(!showResetPassword); // Show reset password field
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword ) {
      toast.error("Password doesn't Match");
      setMatchPassword("Password doesn't Match");
      return;
    }  else if (!confirmPassword) {
            toast.error("Empty fides");
    } else {
      try {
        const formData = {
          employee_id: singleEmployee?.employee_id,
          employee_email: singleEmployee?.employee_email,
          employee_password: newPassword,
        };
        console.log(formData);

        const response = await resetEmployeePassword(
          formData,
          token
        );
        if (!response.ok) {
          // throw new Error("Failed to update employee");
          return;
        }
        toast.success("Employee Password Updated successfully!");
        setMatchPassword("");
        navigator("/admin/employees"); // Redirect
      } catch (error) {
        setServerError("Error updating employee.");
         toast.error("Error updating employee.");
      }
    }
  };

  return (
    <section>
      <div>
        {singleEmployee ? (
          <>
            <section className="contact-section">
              <div className="auto-container">
                <div className="contact-title">
                  <h2>
                    Edit: {singleEmployee?.employee_first_name + " "}
                    {singleEmployee?.employee_last_name}
                  </h2>
                  <br />
                  <h3>Email:{singleEmployee?.employee_email}</h3>
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
                              name="employee_first_name"
                              value={employee_first_name}
                              onChange={(event) =>
                                setFirstName(event.target.value)
                              }
                              placeholder="Employee first name"
                              required
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
                              name="employee_last_name"
                              value={employee_last_name}
                              onChange={(event) =>
                                setLastName(event.target.value)
                              }
                              required
                              placeholder="Employee last name"
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <input
                              type="text"
                              name="employee_phone"
                              value={employee_phone}
                              onChange={(event) =>
                                setPhoneNumber(event.target.value)
                              }
                              placeholder="Employee phone (555-555-5555)"
                              required
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <select
                              name="company_role"
                              value={company_role_id}
                              onChange={(event) =>
                                setCompany_role_id(event.target.value)
                              }
                              className="custom-select-box"
                            >
                              <option value="1">Employee</option>
                              <option value="2">Manager</option>
                              <option value="3">Admin</option>
                            </select>
                          </div>
                          <div className="form-group col-md-12">
                            <select
                              value={active_employee}
                              onChange={(event) =>
                                setActive_employee(event.target.value)
                              }
                              className="custom-select-box"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>

                          <div className="form-group col-md-12 buttonsHolder">
                            <button
                              className="btn btn-primary"
                              type="submit"
                              data-loading-text="Please wait..."
                            >
                              <span>Update</span>
                            </button>

                            <button
                              className="resetButton"
                              type="button"
                              onClick={handleToggle}
                            >
                              Reset Password?
                            </button>
                          </div>
                        </div>
                      </form>

                      {showResetPassword && ( // Render reset password field only when showResetPassword is true
                        <>
                          <form onSubmit={handleResetPassword}>
                            <div className="form-group col-md-12">
                              <input
                                type="password"
                                name="newPassword"
                                value={newPassword}
                                onChange={(event) =>
                                  setNewPassword(event.target.value)
                                }
                                placeholder="New Password"
                                required
                              />
                              {matchPassword && (
                                <div className="validation-error" role="alert">
                                  {matchPassword}
                                </div>
                              )}
                            </div>
                            <div className="form-group col-md-12">
                              <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(event) =>
                                  setConfirmPassword(event.target.value)
                                }
                                placeholder="Confirm Password"
                                required
                              />
                            </div>
                            <div className="form-group col-md-12">
                              {/* Button to trigger password reset */}
                              <button
                                className="btn btn-primary"
                                type="submit"
                                // onClick={handleResetPassword}
                              >
                                Reset Password
                              </button>
                            </div>
                          </form>
                        </>
                      )}
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

export default UpdateEmployee;
