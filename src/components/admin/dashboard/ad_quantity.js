import React from "react";
import Load from '../../extention/load'
class AdQuantity extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="card card-stats">
          <div className="card-header card-header-info card-header-icon">
            <div className="card-icon">
              <i className="material-icons">perm_media</i>
            </div>
            <p className="card-category">Quảng cáo</p>
            <h3 className="card-title">{this.props.quantity!==null ? this.props.quantity : <Load />}</h3> 
          </div>
          <div className="card-footer">
            <div className="stats">
              <i className="material-icons">update</i> Just Updated
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdQuantity;
