import React from 'react'
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <section className="services-section style-three">
      <div className="auto-container">
        <div className="sec-title style-two">
          <h2>Dashboard</h2>
          <div className="text">
            Experience the ease and efficiency of Regency, and unlock a new
            level of productivity and engagement in your work.
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 service-block-one">
            <div className="inner-box hvr-float-shadow">
              <Link to="/admin/orders">
                <h2>All Orders</h2>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 service-block-one">
            <div className="inner-box hvr-float-shadow">
              <Link to="/admin/order">
                <h2>New Orders</h2>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 service-block-one">
            <div className="inner-box hvr-float-shadow">
              <Link to="/admin/employees">
                <h2>Employee</h2>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 service-block-one">
            <div className="inner-box hvr-float-shadow">
              <Link to="/admin/services">
                <h2>Services</h2>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 service-block-one">
            <div className="inner-box hvr-float-shadow">
              <Link to="/admin/Profile">
                <h2>profile</h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard