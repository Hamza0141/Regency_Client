import React from "react";
import banner from "../../assets/images/slider/slider-1.jpg";
import featureImg from "../../assets/images/why_choose_us_img.png";
import aboutImg1 from "../../assets/images/about/about-img1.jpg";
// import aboutImg2 from "../../assets/images/about/about_img.png";

import newsLater from "../../assets/images/we_offer_img.jpg";

import ServicePage from "./ServicePage";
import { Link } from "react-router-dom";


function Home() {
  return (
    <>
      <div className="ts-slider-area">
        <div
          className="slider-items slider-overlay"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-12">
                <div className="slider-content">
                  <h1>
                    <small>We give you</small> Quality <span>Auto Repair</span>
                  </h1>
                  <p className="slider-desc">
                    From precision auto repairs to meticulous maintenance, we
                    ensure your vehicle runs smoothly and safely.
                  </p>
                  <Link to="/contact" className="btn btn-primary">
                    Get Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="ts-feature" className="ts-feature pb-0">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="section-title">
                <span>Why</span> Choose Us
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="ts-feature-wrapper">
                    <div className="feature-single">
                      <span className="feature-icon">
                        <i className="icon-mechanic"></i>
                      </span>
                      <div className="feature-content">
                        <h3>
                          <span>Expert</span> Mechanics
                        </h3>
                        <p>
                          Our team of certified mechanics has years of
                          experience and in-depth knowledge, ensuring that your
                          vehicle is in the best hands.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="ts-feature-wrapper">
                    <div className="feature-single">
                      <span className="feature-icon">
                        <i className="icon-price"></i>
                      </span>
                      <div className="feature-content">
                        <h3>
                          <span>Reasonable</span> Price
                        </h3>
                        <p>
                          We offer competitive pricing without compromising on
                          quality, making professional auto repair accessible
                          and affordable.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="gap-35"></div>
              <div className="row">
                <div className="col-md-6">
                  <div className="ts-feature-wrapper">
                    <div className="feature-single">
                      <span className="feature-icon">
                        <i className="icon-client"></i>
                      </span>
                      <div className="feature-content">
                        <h3>
                          <span>Trusted</span> by 1000 Clients
                        </h3>
                        <p>
                          With a proven track record of satisfied customers,
                          we’ve earned the trust of over 1000 clients for
                          reliable and high-quality service.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="ts-feature-wrapper">
                    <div className="feature-single">
                      <span className="feature-icon">
                        <i className="icon-fast"></i>
                      </span>
                      <div className="feature-content">
                        <h3>
                          <span>Fast</span> feature Delivery
                        </h3>
                        <p>
                          We prioritize efficiency, delivering top-notch service
                          with quick turnaround times to get you back on the
                          road faster.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="feature-img">
          <img className="img-fluid" src={featureImg} alt="Why Choose Us" />
        </div>
      </section>

      <section id="ts-about" className="ts-about">
        <div className="container-fluid no-padding">
          <div className="row">
            <div className="col-lg-7 col-md-12">
              <div className="box-skew-hidden-left">
                <div className="box-skew-left">
                  <div className="box-skew-img">
                    <img className="img-fluid" src={aboutImg1} alt="About" />
                  </div>
                  <div className="box-content-wrapper">
                    <h2 className="column-title">
                      <small>Come before 21st Feb</small>
                      <span>Get</span> Upto 30% Rewards
                    </h2>
                    <p>
                      Auto Painting &amp; Collision Repair Shop. We help you
                      turn the car you drive back into the car you love!
                    </p>
                    <a href="#" className="btn btn-primary">
                      Claim Reward
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className="box-skew-right bg-red">
                <div className="box-content-wrapper">
                  <h2 className="column-title">
                    <span>About</span> Regency
                  </h2>
                  <p>
                    Regency has been providing exceptional auto repair services
                    since 1999, with a commitment to quality and expertise.
                  </p>
                  <ul className="unstyled list-round">
                    <li>
                      Frequent oil changes keep your engine running smoothly
                    </li>
                    <li>Proper tire rotations improves fuel efficiency.</li>
                    <li>
                      Our team consists of expert, certified mechanics who
                      handle everything from routine maintenance to complex
                      repairs.
                    </li>
                  </ul>
                </div>
                {/* <img src={aboutImg2} alt="About Automobil" /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ts-working-process" className="ts-working-process">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="section-title">
                <span>Our</span> Working Process
              </h2>
            </div>
          </div>
          <div className="row working-box-wrapper">
            <div className="col-lg-4 col-md-12">
              <div className="working-single-box">
                <div className="working-content-wrapper">
                  <span className="workig-icon">
                    <i className="icon-request_quote"></i>
                  </span>
                  <div className="working-content">
                    <h3>
                      <span>Request</span> Quote
                    </h3>
                    <p>vehicles get damaged just because of maintain</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="working-single-box bg-red">
                <div className="working-content-wrapper">
                  <span className="workig-icon">
                    <i className="icon-car_1"></i>
                  </span>
                  <div className="working-content">
                    <h3>
                      <span>Bring</span> Your Vehicle
                    </h3>
                    <p>
                      Most of the vehicles get damaged just because of maintain
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="working-single-box bg-red-light">
                <div className="working-content-wrapper">
                  <span className="workig-icon">
                    <i className="icon-car_2"></i>
                  </span>
                  <div className="working-content">
                    <h3>
                      <span>Get</span> It Repaired
                    </h3>
                    <p>
                      Most of the vehicles get damaged just because of maintain
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ServicePage />

      <section id="ts-appointment" className="ts-appointment pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <h2 className="section-title">
                    <span>Book</span> An Appointment
                  </h2>
                </div>
              </div>
              <div className="row">
                <div id="contact-form" className="form-container col-lg-12">
                  <form
                    className="contactMe ts-main-form"
                    // action="contactme/service-contact-form.php"
                    // method="POST"
                    // encType="multipart/form-data"
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
                            placeholder="Number"
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
                      </div>
                      <div className="form-row">
                        <div className="col-md-6">
                          <input
                            type="text"
                            name="date"
                            id="date-start-1"
                            data-displayname="Date"
                            className="field cm-date"
                            data-idconnecteddateend="date-end-1"
                            required
                          />
                        </div>
                      </div>

                      <div className="msg"></div>

                      <button
                        className="btn btn-primary"
                        type="submit"
                        data-sending="Sending..."
                      >
                        Get Appointment
                      </button>
                    </section>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <h2 className="section-title">
                    <span>Clients</span> Love
                  </h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="testimonial-carousel">
                    <div className="testimonial-container">
                      <div className="testimonial-body">
                        <div className="testimonial-content">
                          <h4 className="service-name">Engine Diagnostic</h4>
                          <ul className="unstyled ts-rating">
                            <li>
                              <i className="fa fa-star"></i>
                            </li>
                            <li>
                              <i className="fa fa-star"></i>
                            </li>
                            <li>
                              <i className="fa fa-star"></i>
                            </li>
                            <li>
                              <i className="fa fa-star"></i>
                            </li>
                            <li>
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>
                        </div>
                        <p>
                          Wonderful serenity has taken possession of my entire
                          soul, like these sweet moments of relaxation in this
                          spot.
                        </p>
                        <span className="quote-icon">
                          <i className="icon icon-quote22"></i>
                        </span>
                      </div>
                      <div className="testimonial-footer">
                        
                        <div className="client-info">
                          <h3 className="client-name">Donald Gonzales</h3>
                          <span className="client-desig">Lead Painter</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ts-newsletter" className="ts-newsletter">
        <div className="container-fluid no-padding">
          <div className="row">
            <div className="col-md-6 align-self-center">
              <div className="box-skew-area-left bg-red">
                <div className="box-skew-sm-left">
                  <h2 className="column-title text-white">
                    <span>Subscribe</span> For Newsletter
                  </h2>
                  <form
                    className="contactMe newsletter-form"
                    // action="contactme/newsletter-form.php"
                    // method="POST"
                    // encType="multipart/form-data"
                  >
                    <section>
                      <div className="form-row">
                        <div className="col-md-12 newsletter-box">
                          <input
                            type="email"
                            name="email"
                            data-displayname="E-mail"
                            className="field"
                            placeholder="Your Email"
                            required
                          />
                          <button
                            className="btn btn-bordered"
                            type="submit"
                            data-sending="Sending..."
                          >
                            <i className="fa fa-send"></i>
                          </button>
                        </div>
                      </div>
                      <div className="msg"></div>
                    </section>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="box-skew-area-right">
                <div className="box-skew-sm-right">
                  <img src={newsLater} alt="" />
                  <h2 className="column-title text-white no-border">
                    <small>We offer you</small>
                    <span>The</span> Best Auto Repair Service
                  </h2>
                  <a href="#" className="btn btn-primary">
                    Contact US
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
