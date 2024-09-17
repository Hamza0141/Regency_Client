import React from 'react'
import serviceImage1 from "../../assets/images/service/service_img1.jpg"
import serviceImage2 from "../../assets/images/service/service_img2.jpg";
import serviceImage3 from "../../assets/images/service/service_img3.jpg";
import serviceImage4 from "../../assets/images/service/service_img4.jpg";
import serviceImage5 from "../../assets/images/service/service_img5.jpg";
import serviceImage6 from "../../assets/images/service/service_img6.jpg";
import { Link } from 'react-router-dom';



function ServicePage() {
  return (
    <>
      {/* Service Background Section */}
      <section id="ts-service-bg" className="ts-service-bg bg-overlay">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="section-title text-white">
                <span>Services</span> We Provide
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="ts-service" className="ts-service pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <div className="ts-service-wrapper">
                <span className="service-img">
                  <img className="img-fluid" src={serviceImage1} alt="" />
                </span>
                <div className="service-content">
                  <div className="service-icon">
                    <i className="icon-engine"></i>
                  </div>
                  <h3>
                    <Link to="/offerservice">Engine Diagnostics</Link>
                  </h3>
                  <p>
                    We utilize advanced diagnostic tools to pinpoint engine
                    issues, ensuring your vehicle runs smoothly and efficiently.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="col-lg-4 col-md-12">
              <div className="ts-service-wrapper">
                <span className="service-img">
                  <img className="img-fluid" src={serviceImage2} alt="" />
                </span>
                <div className="service-content">
                  <div className="service-icon">
                    <i className="icon-oil"></i>
                  </div>
                  <h3>
                    <Link to="/offerservice">Lube, Oil and Filters</Link>
                  </h3>
                  <p>
                    Regular oil changes and filter replacements keep your engine
                    well-lubricated and running clean.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="col-lg-4 col-md-12">
              <div className="ts-service-wrapper">
                <span className="service-img">
                  <img className="img-fluid" src={serviceImage3} alt="" />
                </span>
                <div className="service-content">
                  <div className="service-icon">
                    <i className="icon-air_conditioning"></i>
                  </div>
                  <h3>
                    <Link to="/offerservice">Air Conditioning Evac</Link>
                  </h3>
                  <p>
                    Our experts can recharge and service your vehicle’s air
                    conditioning system, ensuring comfort during every drive.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="gap-30"></div>

          <div className="row">
            {/* Service 4 */}
            <div className="col-lg-4 col-md-12">
              <div className="ts-service-wrapper">
                <span className="service-img">
                  <img className="img-fluid" src={serviceImage4} alt="" />
                </span>
                <div className="service-content">
                  <div className="service-icon">
                    <i className="icon-brake"></i>
                  </div>
                  <h3>
                    <Link to="/offerservice">Anti-Lock Brake Service</Link>
                  </h3>
                  <p>
                    We specialize in maintaining and repairing anti-lock brake
                    systems to enhance safety and prevent skidding during hard
                    braking.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 5 */}
            <div className="col-lg-4 col-md-12">
              <div className="ts-service-wrapper">
                <span className="service-img">
                  <img className="img-fluid" src={serviceImage5} alt="" />
                </span>
                <div className="service-content">
                  <div className="service-icon">
                    <i className="icon-computer"></i>
                  </div>
                  <h3>
                    <Link to="/offerservice">Computer Diagnostics</Link>
                  </h3>
                  <p>
                    Using state-of-the-art technology, we assess your vehicle's
                    computer systems to detect and resolve any electronic
                    malfunctions.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 6 */}
            <div className="col-lg-4 col-md-12">
              <div className="ts-service-wrapper">
                <span className="service-img">
                  <img className="img-fluid" src={serviceImage6} alt="" />
                </span>
                <div className="service-content">
                  <div className="service-icon">
                    <i className="icon-performance"></i>
                  </div>
                  <h3>
                    <Link to="/offerservice">Performance Upgrades</Link>
                  </h3>
                  <p>
                    Boost your vehicle’s power and efficiency with our range of
                    performance upgrade services, designed to enhance your
                    driving experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServicePage;