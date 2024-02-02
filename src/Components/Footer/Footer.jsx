import React from "react";

const Footer = () => {
  return (
    <footer
      className="py-3 mt-4"
      style={{
        background:
          "linear-gradient(277deg, rgba(255,255,255,0.5) 0%, rgba(223,238,255,0.4) 100%)",
          position: "absolute",
          bottom: 0,
          width: '100%'
      }}
    >
      <div className="container-md d-flex flex-wrap justify-content-between align-items-center">
        <div className="col-md-4 d-flex align-items-center">
          <a href="https://github.com/HadiatAbdulBashit/weather-app" className="text-decoration-none" target={'_blank'}>
          <span className="text-muted">© 2024 HAB</span>
          </a>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <span className="text-muted">Powered by </span>
            <a href="https://www.weatherapi.com/" title="Free Weather API">
              <img
                src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
                alt="Weather data by WeatherAPI.com"
                border="0"
                height={"30px"}
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
