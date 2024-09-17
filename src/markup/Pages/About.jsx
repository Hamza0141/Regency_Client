import React, { useState } from 'react'
import banner from '../../assets/images/banner/about_banner.jpg'
import AboutImg from "../../assets/images/about/about-img2.jpg"
import ourHistory from "../../assets/images/our-history.png";
import { Link } from "react-router-dom";
function About() {

  const [activeTab, setActiveTab] = useState("home");
  console.log(activeTab);

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
        <div class="container">
          <div class="row justify-content-center">
            <div class="col">
              <div class="banner-heading">
                <h1 class="banner-title">
                  About <span>Us</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="main-container" className="main-container pb-0">
        <div className="ts-about-us">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="section-title">
                  <span>About</span> Regency
                </h2>
              </div>
            </div>

            <div className="row overflow-hidden no-gutters">
              <div className="col-lg-7 col-md-12">
                <div className="box-skew-hidden-left">
                  <div className="box-skew-left">
                    <img className="img-fluid" src={AboutImg} alt="" />
                  </div>
                </div>
              </div>

              <div className="col-lg-5 col-md-12">
                <div className="box-skew-right">
                  <div className="box-content-wrapper">
                    <i className="icon-repair"></i>
                    <h2 className="column-title no-border">
                      <span>20 Years</span> Experience
                    </h2>
                    <p>
                      At Regency, we bring over 20 years of dedicated experience
                      to the automotive industry. Our team of skilled
                      professionals is committed to providing top-notch
                      services, ensuring your vehicle receives the highest
                      quality care. Whether it's routine maintenance, complex
                      repairs, or performance enhancements, we take pride in
                      delivering exceptional results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ts-history-tab" className="ts-history-tab">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12">
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <ul className="nav nav-tabs ts-tab" role="tablist">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "home" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("home")}
                        role="tab"
                        aria-controls="home"
                        aria-selected={activeTab === "home"}
                      >
                        <i className="icon-history"></i>Our History
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "profile" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("profile")}
                        role="tab"
                        aria-controls="profile"
                        aria-selected={activeTab === "profile"}
                      >
                        <i className="icon-history"></i>Our Mission
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "contact" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("contact")}
                        role="tab"
                        aria-controls="contact"
                        aria-selected={activeTab === "contact"}
                      >
                        <i className="icon-history"></i>Our Vision
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-8 col-md-8">
                  <div className="tab-content ts-tab-content">
                    {activeTab === "home" && (
                      <div
                        className="tab-pane fade show active"
                        role="tabpanel"
                      >
                        <h2 className="column-title-sm">
                          <span>Regency </span> was founded in 1999 at USA
                        </h2>
                        <p>
                          Regency has been dedicated
                          to providing top-notch automotive repair services,
                          becoming a trusted name in the industry.
                        </p>
                        <ul className="list-round-solid">
                          <li>
                            Share best practices and high-tech product
                            knowledge.
                          </li>
                          <li>
                            Collaborate with technology information security.
                          </li>
                          <li>
                            Technology, information security, and business
                            partners.
                          </li>
                        </ul>
                      </div>
                    )}
                    {activeTab === "profile" && (
                      <div
                        className="tab-pane fade show active"
                        role="tabpanel"
                      >
                        <h2 className="column-title-sm">
                          <span>Our Mission</span> for a better future
                        </h2>
                        <p>
                          Our mission is to provide reliable, high-quality
                          automotive repair and maintenance services that exceed
                          customer expectations.
                        </p>
                        <ul className="list-round-solid">
                          <li>Exceed customer expectations.</li>
                          <li>
                            Promote innovation in the automotive repair
                            industry.
                          </li>
                          <li>Maintain sustainable business practices.</li>
                        </ul>
                      </div>
                    )}
                    {activeTab === "contact" && (
                      <div
                        className="tab-pane fade show active"
                        role="tabpanel"
                      >
                        <h2 className="column-title-sm">
                          <span>Our Vision</span> for the future of automotive
                          services
                        </h2>
                        <p>
                          We envision a future where our automotive services are
                          at the forefront of innovation and environmental
                          stewardship.
                        </p>
                        <ul className="list-round-solid">
                          <li>Lead the industry in sustainable practices.</li>
                          <li>Provide cutting-edge services and technology.</li>
                          <li>
                            Empower our customers through knowledge and
                            transparency.
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 text-right">
              <span>
                <img className="img-fluid" src={ourHistory} alt="Our History" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About