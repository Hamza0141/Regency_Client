import React,{ useState } from "react";
import Logo from "../../../assets/images/logo/logo.png"
import logotoggler from "../../../assets/images/icons/icon-bar.png";
import { useAuth } from "../../../Contexts/AuthContext";
import { logOut } from "../../../services/login.service";
import { Link } from "react-router-dom";

const Header = () => {
  const { isLogged, setIsLogged, employee } = useAuth();
  const [showRoutes, setShowRoutes] = useState(false);
   const logOutUser = () => {
     // Call the logout function from the login service
     logOut();
     // Set the isLogged state to false
     setIsLogged(false);
   };

      

      const toggleRoutes = () => {
        setShowRoutes(!showRoutes);
      };
  return (
    <>
      {/* Top Bar */}
      <div className="ts-top-bar">
        <div className="top-bar-angle">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-4"></div>
              <div className="col-lg-4 col-md-5">
                {isLogged ? (
                  <div className="top-bar-event ts-top">
                    <span>Welcome {employee?.employee_first_name}</span>
                  </div>
                ) : (
                  <div className="top-bar-event ts-top">
                    <i className="icon icon-clock"></i>
                    <span>Open: Mon - Sat 9:00 AM - 5:30 Pm</span>
                  </div>
                )}
              </div>
              <div className="col-lg-2 col-md-3 text-right">
                <div className="top-bar-social-icon ml-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="ts-header header-default">
        <div className="ts-logo-area">
            <div className="toggleWrapper col-md-8 col-sm-8 navbar-toggler">
              <div className="toggleImg">
                <img src={logotoggler} onClick={toggleRoutes} alt="" />
              </div>
              {showRoutes && (
                <div className="menuList">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="/offerservice">Services</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                    {isLogged ? (
                      <>
                        <div>
                          <Link to="/dashboard">Dashboard</Link>
                        </div>
                        <div>
                          <Link to="/" onClick={logOut}>
                            Log out
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div>
                        <Link to="/login">Login</Link>
                      </div>
                    )}
                  </ul>
                </div>
              )}
            </div>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4 col-sm-4">
                <Link to="/" className="ts-logo">
                  <img src={Logo} alt="logo" />
                </Link>
              </div>

              <div className="col-md-8 col-sm-8 float-right contactInfo">
                <ul className="top-contact-info">
                  <li>
                    <span>
                      <i className="icon icon-phone3"></i>
                    </span>
                    <div className="info-wrapper">
                      <p className="info-title">Call us</p>
                      <p className="info-subtitle">+816 920 6002</p>
                    </div>
                  </li>
                  <li>
                    <span>
                      <i className="icon icon-envelope"></i>
                    </span>
                    <div className="info-wrapper">
                      <p className="info-title">Send us mail</p>
                      <p className="info-subtitle">kcregencyauto@gmail.com</p>
                    </div>
                  </li>
                  <li>
                    {/* <a href="#" className="btn btn-primary">
                      Contact us
                    </a> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="header-angle">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div
                className="collapse navbar-collapse justify-content-end ts-navbar"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a className="nav-link">{<Link to="/"> Home</Link>}</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link">
                      {<Link to="/about"> About</Link>}
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link">
                      {<Link to="/offerservice"> Services</Link>}
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link">
                      {<Link to="/contact"> Contact</Link>}
                    </a>
                  </li>
                  {isLogged ? (
                    <>
                      <li className="nav-item dropdown">
                        <a className="nav-link">
                          <Link to="/dashboard">Dashboard</Link>
                        </a>
                      </li>

                      <li className="nav-item dropdown">
                        <a className="nav-link">
                          <Link to="/" onClick={logOutUser}>
                            Log out
                          </Link>
                        </a>
                      </li>
                    </>
                  ) : (
                    <li className="nav-item dropdown">
                      <a className="nav-link">
                        <Link to="/login">Login</Link>
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              <div className="header-cart"></div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
