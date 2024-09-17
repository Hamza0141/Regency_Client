import React from 'react'
import banner from "../../assets/images/banner/contact_banner.jpg"

function Contact() {
  return (
    <>
      <div
        class="banner-area bg-overlay"
        id="banner-area"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="banner-heading">
                <h1 className="banner-title">
                  Contact <span>Details</span>
                </h1>
                
              </div>
            </div>
          </div>
        </div>
      </div>

        <section id="main-container" className="main-container ts-contact-us">
      <div className="container">
      <div className="gap-75"></div>
      <div className="row">
        <div className="col-lg-8">
          <h2 className="section-title">
            <span>Ask</span> A Question
          </h2>
          <div id="contact-form" className="form-container contact-us">
            {/* START copy section: Hotel Contact Form */}
            <form
              className="contactMe"
              action="contactme/contact-us.php"
              method="POST"
              encType="multipart/form-data"
            >
              <section>
                <div className="form-row">
                  <div className="col-lg-6">
                    <input
                      type="text"
                      name="name"
                      data-displayname="Name"
                      className="field"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="tel"
                      name="phone"
                      data-displayname="Phone"
                      className="field"
                      placeholder="Phone"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-6">
                    <input
                      type="email"
                      name="email"
                      data-displayname="E-mail"
                      className="field"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <select name="service" className="field">
                      <option value="title">Select Service</option>
                      <option value="Engine">Engine Diagnostics</option>
                      <option value="Lube">Lube, Oil and Filters</option>
                      <option value="Air">Air Conditioning Evac</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-12">
                    <textarea
                      name="message"
                      data-displayname="Message"
                      className="field"
                      placeholder="Message"
                      required
                    ></textarea>
                  </div>
                </div>


                <div className="msg"></div>

                <button
                  className="btn btn-primary"
                  type="submit"
                  data-sending="Sending..."
                >
                  Send Message
                </button>
              </section>
              {/* Section end */}
            </form>
            {/* END copy section:Service Contact Form */}
          </div>
          {/* Contact form end */}
        </div>
        <div className="col-lg-4">
          <div className="sidebar sidebar-right">
            <div className="widget">
              <h3 className="widget-title">
                <span>Working</span> Hours
              </h3>
              <ul className="unstyled service-time">
                <li>
                  <span>Monday</span>
                  <span>7.00 - 16.30</span>
                </li>
                <li>
                  <span>Tuesday</span>
                  <span>7.00 - 16.00</span>
                </li>
                <li>
                  <span>Wednesday</span>
                  <span>7.00 - 16.20</span>
                </li>
                <li>
                  <span>Thursday</span>
                  <span>7.00 - 16.00</span>
                </li>
                <li>
                  <span>Friday</span>
                  <span>7.00 - 16.20</span>
                </li>
                <li>
                  <span>Saturday</span>
                  <span>7.00 - 16.10</span>
                </li>
              </ul>
            </div>
            {/* Working time end */}

            <div className="widget widget-social">
              <h3 className="widget-title">
                <span>On</span> Socials
              </h3>
              <ul className="unstyled social-icons">
                <li>
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-google-plus"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
      </section>
    </>
  );
}

export default Contact