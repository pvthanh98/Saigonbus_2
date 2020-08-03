import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
class FormModifyDevice extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            device_id: this.props.match.params.id,
            device_name:"",
            updateComplete: false
        }
    }
    onHandleInput = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onHandleFormModifyDevice = (e) =>{
     //   this.props.isAddingDevice(true);
        e.preventDefault();
        console.log(this.state)
        var body = {
            device_id: this.state.device_id,
            device_name: this.state.device_name
        }
        axios.post('https://sensorhub.tech/api/update_device',body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}` 
            }
        }).then((res)=>{
            this.setState({
                updateComplete: true
            });
        }).catch((err)=>console.log(err));
    }
    render(){
        if(this.state.updateComplete) return <Redirect to ="/admin/device" />;
        return (
            <div className="card">
                <div className="card-body">
                    <h3>Chỉnh sửa</h3>
                    <form onSubmit={this.onHandleFormModifyDevice}>
                        <div className="form-group">
                            <div>ID</div>
                            <input type="text" className="form-control mt-2" value={this.props.match.params.id} name="device_id" readOnly/>
                        </div>
                        <div className="form-group">
                            <div>Tên Thiết Bị</div>
                            <input onChange={this.onHandleInput} type="text" name="device_name" className="form-control" value={this.state.device_name} placeholder="Enter device name"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Đồng ý</button>
                    </form>
                </div>
            </div>  
        );
    }
}

export default FormModifyDevice;