import React from 'react';
class WatchAdvertising extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file: null,
            openModal: false,
        }
    }
    render(){
        return (
            <div className="modal fade" id="watchAd"role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Xem quảng cáo</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                        <div className="modal-body">
                            <video key={this.props.srcAdvertising} width="100%" controls>
                                <source src={this.props.srcAdvertising} type="video/mp4" />
                            </video>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WatchAdvertising;