import React, { useState } from 'react';
class APIGET extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleID: "#"+this.props.api_name
        }
    }
    
    render() {
        return (
            <div className="card">
                <button type="button" className="btn btn-success" data-toggle="collapse" data-target={this.state.toggleID} role="button" aria-expanded="false" aria-controls="collapseExample">
                    {this.props.api_description}
                </button>
                <div className="collapse" id={this.props.api_name}>
                    <div>Phương thức: GET</div>
                </div>
            </div>
        )
    }
}

export default APIGET