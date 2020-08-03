import React from "react";
import Load from '../../extention/load';
class DeviceQuantity extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="card card-stats">
          <div className="card-header card-header-danger card-header-icon">
            <div className="card-icon" id="">
              <i className="material-icons">stay_current_portrait</i>
            </div>
            <p className="card-category">Thiết bị</p>
            <h3 className="card-title">{this.props.quantity!==null ? this.props.quantity : <Load />}</h3>  
          </div>
          <div className="card-footer">
            <div className="stats">
              <i className="material-icons">timer</i> 10:00
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeviceQuantity;
