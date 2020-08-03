import React from 'react';
import Sidebar from '../layouts/sidebar';
import Header from '../layouts/header';
import Footer from '../layouts/footer';
import { Route, Switch } from "react-router-dom";
import Device from '../admin/device/get_device';
import ModifyDevice from './device/edit';
import Advertising from './advertising/get_advertising';
import Index from './dashboard/index';
import Profile from './profile/get_profile';
import Setting from './config/getconfig';
import Map from './map/index';
import Documentation from './documentation/get_docs';
import NotFound from '../notfound'
import socketIOClient from "socket.io-client";
const RETRY_INTERVAL = 5000;
const ENDPOINT = "https://sensorhub.tech";
const socket = socketIOClient(ENDPOINT);
var timeout;
let connected = false;
socket.on('connect',function(){
  connected = true;
  clearTimeout(timeout);
	socket.emit('authenticate', {
		token: localStorage.getItem("token")
	})
})
socket.on("disconnect", function(){
  connected = false;
  console.log("Socket disconnected");
  retryConnectOnFailure(RETRY_INTERVAL);
})
var retryConnectOnFailure = function (retryInMilliseconds) {
	timeout = setTimeout(function () {
		if (!connected) {
			console.log("Try to connect...", connected)
			socket.connect("https://sensorhub.tech");
			retryConnectOnFailure(retryInMilliseconds);
		}
	}, retryInMilliseconds);
};

class Admin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        active: "dashboard",
    }
  }

  onActive = (menu) =>{
    console.log(menu)
    this.setState({
      active:menu
    })
  }
  render(){
    return (
      <div className="wrapper ">
          <Sidebar active={this.state.active} />
          <div className="main-panel">
          <Header />
          <div className="content">
              <div className="container-fluid">
                <Switch>
                  <Route exact path="/" component={Index} /> 
                  <Route exact path="/device/modify/:id" component={ModifyDevice} /> 
                  <Route exact path="/device" component={Device} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/setting" component={Setting} />
                  <Route exact path="/advertising" component={Advertising} />
                  <Route exact path="/documentation" component={Documentation} />
                  <Route exact path="/map" component={Map} />
                  <Route component={NotFound} />
                </Switch>
              </div>
          </div>
          <Footer />
          </div>
      </div>
    );
  }
}
export { socket };
export default Admin;
