import React from 'react';
import axios from 'axios';
class GetProfile extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            name: "",
            email: "",
            // password: "",
            load: true
        }
    }
    componentDidMount(){
        axios.get('https://sensorhub.tech/api/me',{ 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}` 
            }
        }).then((res)=>{
            this.setState({
                name: res.data.name,
                email: res.data.email,
                // password: res.data.password,
                load:false
            })
        }).catch((e)=> alert(e))
    }

    onChangeInput = (e) =>{
        this.setState({
            [ e.target.name]: e.target.value
        })
    }

    onSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
    }
    render() {
        return (
            <div className="col-md-12">
                <div className="row">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header card-header-primary">
                      <h4 className="card-title">Thông tin người dùng</h4>
                      <p className="card-category">Hoàn thành thông tin của bạn</p>
                    </div>
                    <div className="card-body">
                      <form onSubmit={this.onSubmit}>
                        <div className="row">
                          <div className="col-md-3">
                            <div className="form-group">
                              <div>Tên người dùng</div>
                              <input value={this.state.name} onChange={this.onChangeInput} type="text" className="form-control"/>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <div>Địa chỉ email</div>
                              <input value= {this.state.email} onChange={this.onChangeInput} type="email" className="form-control"/>
                            </div>
                          </div>
                          {/* <div className="col-md-4">
                            <div className="form-group">
                              <div>Mật khẩu</div>
                              <input value= {this.state.password} onChange={this.onChangeInput} type="password" className="form-control"/>
                            </div>
                          </div> */}
                        </div>
                        <button type="submit" className="btn btn-primary pull-right">Update Profile</button>
                        <div className="clearfix"></div>
                      </form>
                    </div>
                  </div>
            </div>
            <div className="col-md-4">
            <div className="card card-profile">
              <div className="card-avatar">
                <a href="#pablo">
                  <img className="img" src="/images/tma.png" />
                </a>
              </div>
            </div>
          </div>
          </div>
          </div>


        );
    }
}

export default GetProfile;