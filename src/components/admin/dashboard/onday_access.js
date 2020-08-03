import React from "react";
import Load from '../../extention/load'
class OndayAccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      isLoad: true,
    };
  }

  render() {
    return (
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="card card-stats">
          <div className="card-header card-header-success card-header-icon">
            <div className="card-icon">
              <i className="material-icons">today</i>
            </div>
            <p className="card-category">Trong ngày</p>
            <h3 className="card-title">{ typeof (this.props.quantity) != "undefined"  ? this.props.quantity.y :<Load />  }</h3>
          </div>
          <div className="card-footer">
            <div className="stats">
              <i className="material-icons">date_range</i> Last 24 Hours
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OndayAccess;
