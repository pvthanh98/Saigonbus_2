import React from 'react';
import axios from 'axios';
import changeName from './changeName';
var FormData = require('form-data');
class FormAddDevice extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file: null,
            openModal: false,
        }
        this.errors = [];
        this.mediaFormat = [
            "jpg", "jpeg", "png", "mp4", "mov","webm"
        ]
    }

    
    
    fileSelectedHandler = event => {
        //console.log(event.target.files[0].name)
        this.setState({
            file: event.target.files[0]
        })
    }

    validateMidea(fileName) {
        fileName = changeName(fileName);
        console.log(fileName)
        var is_error =false;
        this.errors =[];
        var { ad_list } = this.props;
        if(ad_list.findIndex((ad)=> ad.media_name === fileName) >= 0) {
            is_error = true;
            this.errors.push("Tên file đã trùng") ;
        }
        var format = fileName.substr(fileName.lastIndexOf(".")+1);
        if(this.mediaFormat.findIndex((extension)=> extension ===format) < 0){
            is_error =true;
            this.errors.push("Chỉ được tải midea với định dạng: jpg, png, jpeg, mp4, mov, webm");
        }
        this.props.onStatusUpload({errors : this.errors})
        if(is_error) return false;
        return true;
    }

    onSubmit = (e) => {
        if(!this.validateMidea(this.state.file.name)) return;
        const fd = new FormData();
        fd.append('file', this.state.file)
        axios.post("https://sensorhub.tech/api/upload", fd,{
            onUploadProgress: ProgressEvent =>{
                this.props.onGetInfo({
                    loadProgress: (Math.ceil((ProgressEvent.loaded / ProgressEvent.total)* 100)),
                    isLoad:true
                })
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then((res)=>{
            if(res.status === 200) {
                this.props.onGetInfo({
                    loadProgress: 0,
                    isLoad:false
                })
            }
        })
        .catch((err)=>console.log(err))
    }

    render(){
        return (
            <div className="modal fade" id="exampleModal"role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Thêm quảng cáo</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                        <div className="modal-body">
                            <input onChange={this.fileSelectedHandler} type="file" name="fileUpload" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={this.onSubmit} type="submit" className="btn btn-primary" data-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormAddDevice;