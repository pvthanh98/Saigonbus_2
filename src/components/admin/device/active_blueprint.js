import React from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import refresh from '../../../refresh.svg';
const ENDPOINT = "https://sensorhub.tech";
const socket = socketIOClient(ENDPOINT);
socket.on('connect',function(){
  socket.emit('authenticate', {
      token: localStorage.getItem("token")
  })
})

class ActiveBluePrint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blueprint_id: "",
      updateComplete: false,
    };
  }
  componentWillMount() {
    this.setState({
      blueprint_id: this.props.blueprint_id,
    });
  }

  onChangeInput = (e) => {
    var body = {
      device_id: this.props.device_id,
      blueprintId: e.target.value,
    };
    axios
      .post("https://sensorhub.tech/api/update_device", body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.onUpdateConfigSuccess("completed");

          console.log("CLIENT EMIT SETTING", {
            device_id: [this.props.device_id],
            message_type: "update_setting",
          })

          socket.emit("bus", {
            device_id: [this.props.device_id],
            message_type: "update_setting",
          });
        }
      })
      .catch((err) => console.log(err));
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitConfig = (id) =>{
    this.props.onUpdateConfigSuccess("completed");
    console.log("Emit socket", {
        device_id: [id],
        message_type: "update_setting",
    })
    console.log("CLIENT EMIT SETTING", {
        device_id: [this.props.device_id],
        message_type: "update_setting",
      })
    socket.emit("bus", {
        device_id: [id],
        message_type: "update_setting",
    });
  }
  render() {
    var { blueprints } = this.props;
    var show = blueprints.map((blueprint, index) => {
      return (
        <option key={index} value={blueprint._id}>
          {blueprint.name}{" "}
        </option>
      );
    });
    return (
      <form onSubmit={this.onSubmit}>
        <div className="d-flex">
          <select
            name="blueprint_id"
            className="custom-select"
            onChange={this.onChangeInput}
            value={this.state.blueprint_id}
          >
            {show}
          </select>
          <div>
          <div onClick={()=> this.onSubmitConfig(this.props.device_id)} className="ml-2" style={{cursor:"pointer"}}>
            <img src={refresh} width="20px" />
          </div>
          </div>
        </div>
      </form>
    );
  }
}

export default ActiveBluePrint;
