import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import {
  getEmployeeById,
  changeEmployeePassword,
} from "../../../../services/employee.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

function Profile() {
  const [singleEmployee, setSingleEmployee] = useState(null);
  const [existing_Password, setExisting_Password] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [matchPassword, setMatchPassword] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState("");
  const [serverError, setServerError] = useState("");

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  const id = employee.employee_id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeById(id, token);
        if (!response.ok) {
          throw new Error("Failed to fetch employee");
        }
        const data = await response.json();
        setSingleEmployee(data[0]);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch employee details.");
      }
    };

    fetchEmployee();
  }, [id, token]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Password doesn't Match");
      setMatchPassword("Password doesn't Match");
      return;
    } else if (!confirmPassword) {
      toast.error("Empty fides");
      setMatchPassword("Empty Value");
    } else {
      try {
        const formData = {
          employee_id: singleEmployee?.employee_id,
          employee_email: singleEmployee?.employee_email,
          existing_Password: existing_Password,
          new_employee_password: newPassword,
        };
        console.log(formData);

        const response = await changeEmployeePassword(
          formData,
          token
        );
        if (!response.ok) {
          toast.info("Check Your Current Password");
          return;
        }
        toast.success("Password Updated successfully!");
        setMatchPassword("");
        setExisting_Password("");
        setConfirmPassword("");
        setNewPassword("");
        setShowResetPassword(false);
        // window.location.reload(); // Redirect
      } catch (error) {
        console.error(error);
        setServerError("Error updating Password.");
        toast.error("Error updating Password.");
      }
    }
  };

  const handleToggle = async () => {
    setShowResetPassword(!showResetPassword); // Show reset password field
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {singleEmployee && (
        <div className="profile-card">
          <div className="profile-details">
            <h2>{`${singleEmployee?.employee_first_name} ${singleEmployee?.employee_last_name}`}</h2>
            <p>Email: {singleEmployee?.employee_email}</p>
            <p>Phone: {singleEmployee?.employee_phone}</p>
            <p>Active: {singleEmployee.active_employee ? "Yes" : "No"}</p>
            <button className="" type="button" onClick={handleToggle}>
              Change Password?
            </button>
          </div>
        </div>
      )}

      {showResetPassword && ( // Render reset password field only when showResetPassword is true
        <>
          <div className="profile-card">
            <form onSubmit={handleChangePassword}>
              <div className="form-group col-md-12">
                {incorrectPassword && (
                  <div className="validation-error" role="alert">
                    {incorrectPassword}
                  </div>
                )}
                <input
                  type="password"
                  name="existing_Password"
                  value={existing_Password}
                  onChange={(event) => {
                    setExisting_Password(event.target.value);
                    setMatchPassword("");
                  }}
                  placeholder="Current Password"
                />
              </div>
              {matchPassword && (
                <div className="validation-error" role="alert">
                  {matchPassword}
                </div>
              )}
              <div className="form-group col-md-12">
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(event) => {
                    setNewPassword(event.target.value);
                    setMatchPassword(""); // Reset matchPassword state
                  }}
                  placeholder="New Password"
                />
              </div>
              <div className="form-group col-md-12">
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setMatchPassword("");
                  }}
                  placeholder="Confirm Password"
                />
              </div>
              <div className="form-group col-md-12">
                <button className="btn btn-primary" type="submit">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
