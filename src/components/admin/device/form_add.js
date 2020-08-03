import React from 'react';
import axios from 'axios';
class FormAddDevice extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            device_id: "",
        }
    }

    onHandleInput = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onHandleFormAddDevice = (e) =>{
        if(this.state.device_id ===""){
            alert("Vui lòng nhập mã thiết bị");
            return
        }
        this.props.isAddingDevice(true);
        e.preventDefault();
        var body = {
            device_id: this.state.device_id
        }
        axios.post('https://sensorhub.tech/api/provision',body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}` 
            }
        }).then((res)=>{
            this.props.isAddingDevice(false);
            console.log(res);
        }).catch((err)=>console.log(err));
    }
    render(){
        return (
            <div className="modal fade" id="add_device" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Thêm Thiết Bị</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                      
                    <div className="modal-body">
                        <input onChange={this.onHandleInput} value={this.state.device_id} className="form-control" name="device_id" placeholder="Device ID" />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"  data-dismiss="modal">Thoát</button>
                        <button onClick={this.onHandleFormAddDevice} type="submit" className="btn btn-primary"  data-dismiss="modal">Lưu</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormAddDevice;