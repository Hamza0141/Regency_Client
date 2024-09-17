import React from 'react';
import {Link}from 'react-router-dom'
import { useAuth } from "../../../../Contexts/AuthContext";


function AdminMenu(props) {
    const { employee } = useAuth();
    

    return (
      <div>
        <div className="admin-menu">
          <h2>Admin Menu</h2>
        </div>
        <div className="list-group">
          <Link className="list-group-item" to="/dashboard">
            Dashboard
          </Link>
          <Link className="list-group-item" to="/admin/orders">
            Orders
          </Link>
          <Link className="list-group-item" to="/admin/order">
            New order
          </Link>

          {employee.employee_role !== 1 && (
            <>
              <Link className="list-group-item" to="/admin/add-employee">
                Add employee
              </Link>

              <Link className="list-group-item" to="/admin/employees">
                Employees
              </Link>
              <Link className="list-group-item" to="/admin/add-customer">
                Add customer
              </Link>
              <Link className="list-group-item" to="/admin/customers">
                Customers
              </Link>
            </>
          )}
          <Link className="list-group-item" to="/admin/services">
            Services
          </Link>
          <Link className="list-group-item" to="/admin/Profile">
            Profile
          </Link>
        </div>
      </div>
    );
}

export default AdminMenu;