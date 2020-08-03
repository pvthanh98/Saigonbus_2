import React from 'react';
function Footer() {
  return (
    <footer className="footer">
      <nav>
        <ul>
          <li>
            <a >
              Licenses
            </a>
          </li>
        </ul>
      </nav>
      <div className="container-fluid">
        <div className="copyright float-right">
          &copy;
            made by
             TMA Solutions
          </div>
      </div>
      <div style={{cursor:"pointer"}} className="fixed-plugin">
        <div className="dropdown show-dropdown">
          <a  data-toggle="dropdown">
            <i className="fa fa-cog fa-2x"> </i>
          </a>
          <ul className="dropdown-menu">
            <li className="header-title"> Giao Diện</li>
            <li className="adjustments-line">
              <a style={{cursor:"pointer"}} className="switch-trigger active-color">
                <div className="badge-colors ml-auto mr-auto">
                  <span className="badge filter badge-purple" data-color="purple"></span>
                  <span className="badge filter badge-azure" data-color="azure"></span>
                  <span className="badge filter badge-green" data-color="green"></span>
                  <span className="badge filter badge-warning" data-color="orange"></span>
                  <span className="badge filter badge-danger" data-color="danger"></span>
                  <span className="badge filter badge-rose active" data-color="rose"></span>
                </div>
                <div className="clearfix"></div>
              </a>
            </li>
            <li className="header-title">Images</li>
            <li className="active">
              <a className="img-holder switch-trigger">
                <img src="/assets/img/sidebar-1.jpg" alt="" />
              </a>
            </li>
            <li>
              <a className="img-holder switch-trigger">
                <img src="/assets/img/sidebar-2.jpg" alt="" />
              </a>
            </li>
            <li>
              <a className="img-holder switch-trigger">
                <img src="/assets/img/sidebar-3.jpg" alt="" />
              </a>
            </li>
            <li>
              <a className="img-holder switch-trigger">
                <img src="/assets/img/sidebar-4.jpg" alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
export default Footer;