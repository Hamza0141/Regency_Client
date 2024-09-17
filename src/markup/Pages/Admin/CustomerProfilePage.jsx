import React from "react";
// Import the auth hook
import { useAuth } from "../../../Contexts/AuthContext";
// Import the login form component
import LoginForm from "../../components/LoginForm/LoginForm";
// Import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import CustomerProfile from "../../components/Admin/CustomerProfile/CustomerProfile";
import { useParams } from "react-router-dom";

function CustomerProfilePage() {
  const { customer_id } = useParams();
  const { isLogged, isAdmin, isManager } = useAuth();

  if (isLogged) {
    if (isAdmin || isManager) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <CustomerProfile id={customer_id} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="not-found-container">
          <h1 className="not-found-title">Unauthorized Page</h1>
          <p className="not-found-message">
            You are not authorized to access this page.
          </p>
        </div>
      );
    }
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

export default CustomerProfilePage;
