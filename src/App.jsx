import React from 'react'
import { Routes, Route } from "react-router";

// pages

import Header from './markup/components/Header/Header';
import Home from './markup/Pages/Home';
import About from './markup/Pages/About';
import Footer from './markup/Pages/Footer';
import ServicePage from "./markup/Pages/ServicePage";
import Contact from './markup/Pages/Contact';
import Login from './markup/Pages/Login';
import Unauthorized from './markup/Pages/Unauthorized';

//admins page
import DashboardPage from './markup/Pages/Admin/DashboardPage';
// import Service from './markup/Pages/Admin/Service';
import Services from './markup/Pages/Admin/Services';
import UpdateServicePage from './markup/Pages/Admin/UpdateServicePage';
import AddEmployee from './markup/Pages/Admin/AddEmployee';
import AddCustomer from './markup/Pages/Admin/AddCustomer';
import Customers from './markup/Pages/Admin/Customers';
import UpdateCustomerPage from './markup/Pages/Admin/UpdateCustomerPage';
import UpdateVehiclePage from './markup/Pages/Admin/UpdateVehiclePage';
import UpdateEmployeePage from "./markup/Pages/Admin/UpdateEmployeePage";
import UpdateOrderPage from './markup/Pages/Admin/UpdateOrderPage';
import CustomerProfilePage from './markup/Pages/Admin/CustomerProfilePage';
import ProfilePage from './markup/Pages/Admin/ProfilePage';
import Employees from './markup/Pages/Admin/Employees';
import OrderPage from './markup/Pages/Admin/OrderPage';
import OrdersPage from "./markup/Pages/Admin/OrdersPage";
import OrderDetailPge from './markup/Pages/Admin/OrderDetailPge';
import { ToastContainer } from "react-toastify";

//customer's order page
import CustomerOrderPage from './markup/Pages/Admin/CustomerOrderPage';


//route auth
import PrivateAuthRoute from './markup/components/Auth/PrivateAuthRoute';



//template css
import "./assets/css/style2.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/animate.css";
import "./assets/css/icofonts.css";
import "./assets/css/automobil_icon.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/contactme/bootstrap-datepicker.standalone.min.css";
import "./assets/css/contactme/contactme-1.6.css";
import "./assets/css/style.css";
import "./assets/css/custom.css";
import "./assets/css/responsive.css";



// import "bootstrap/dist/css/bootstrap.min.css";



function App() {
  return (
    <>
      <Header />
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/offerservice" element={<ServicePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin/services" element={<Services />} />

        {/* Common Routes */}
        <Route
          path="/customer/order/detail/:hash"
          element={<CustomerOrderPage />}
        />
        <Route path="/admin/order" element={<OrderPage />} />
        <Route path="/admin/orders" element={<OrdersPage />} />
        <Route
          path="/admin/order/update_order/:hash"
          element={<UpdateOrderPage />}
        />
        <Route path="/admin/order/detail/:hash" element={<OrderDetailPge />} />


        {/* Protected Routes */}
        <Route
          path="/update-service/:serviceId"
          element={
            <PrivateAuthRoute roles={[3, 2]}>
              <UpdateServicePage />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[3, 2]}>
              <AddCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[3, 2]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/update-customer/:customer_id"
          element={
            <PrivateAuthRoute roles={[3, 2]}>
              <UpdateCustomerPage />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/customer-profile/:customer_id"
          element={
            <PrivateAuthRoute roles={[3, 2]}>
              <CustomerProfilePage />
            </PrivateAuthRoute>
          }
        />
        <Route path="/admin/profile" element={<ProfilePage />} />

        <Route
          path="/updatevehicle/:vehicleId"
          element={
            <PrivateAuthRoute roles={[3, 2]}>
              <UpdateVehiclePage />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Employees />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/update-employee/:employee_id"
          element={
            <PrivateAuthRoute roles={[3, 2]}>
              <UpdateEmployeePage />
            </PrivateAuthRoute>
          }
        />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App