import React from 'react';
import { Route, Link, Redirect, NavLink } from "react-router-dom";

const MenuLink = ({ label, to, activeOnlyWhenExat, icon }) => {
  return (
    <Route path={to} exact={activeOnlyWhenExat} children={({ match }) => {
      var active = match ? "nav-item active" : "nav-item";
      return (
        <li className={active}>
          <NavLink to={to} className="nav-link">
            <i className="material-icons">{icon}</i>
            <p>{label}</p>
          </NavLink>
        </li>
      );
    }}
    />
  );
}


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false
    }
  }
  onClearToken = () => {
    localStorage.removeItem('token');
    this.setState({
      logout: true
    })
  }
  render() {
    if (this.state.logout == true) return <Redirect to="/login" />
    return (
      <div className="sidebar" data-color="purple" data-background-color="white" data-image="assets/img/sidebar-3.jpg">
        <div className="logo">
          <a href="http://www.creative-tim.com" className="simple-text logo-normal">
            SaigonBus
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <MenuLink label="Bảng điều khiển" to="/" icon="dashboard" activeOnlyWhenExat={true} />
            <MenuLink label="Thiết Bị" to="/device/" icon="devices_other" activeOnlyWhenExat={true} />
            <MenuLink label="Cấu Hình" to="/setting/" icon="build" activeOnlyWhenExat={true} />
            <MenuLink label="Quảng Cáo" to="/advertising/" icon="perm_media" activeOnlyWhenExat={true} />
            <MenuLink label="Bản Đồ" to="/map/" icon="place" activeOnlyWhenExat={true} />
            <MenuLink label="Hướng Dẫn" to="/documentation/" icon="book" activeOnlyWhenExat={true} />
            <MenuLink label="Người Dùng" to="/profile/" icon="person" activeOnlyWhenExat={true} />
            <li className="nav-item" style={{ cursor: "pointer" }}>
              <a onClick={this.onClearToken} className="nav-link"  >
                <i className="material-icons">arrow_forward</i>
                <p>Đăng Xuất</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar