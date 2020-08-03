import React from "react";
import Load from '../../extention/load'
class CurrentAccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      isLoad: true,
    };
  }

  componentWillReceiveProps(){
    if(this.props.quantity) this.setState({isLoad:false})
  }

  render() {
    return (
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="card card-stats">
          <div className="card-header card-header-warning card-header-icon">
            <div className="card-icon">
              <i className="material-icons">people</i>
            </div>
            <p className="card-category">Truy cập hiện tai</p>
            <h3 className="card-title">{this.props.quantity!==null ? this.props.quantity: <Load/>}</h3> 
          </div>
          <div className="card-footer">
            <div className="stats">
              <div className="stats">
                <i className="material-icons">timer</i> 10:00
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentAccess;
