import React from "react";
import Char from "./chart";
import axios from "../../extention/aixosCustom";
import Load from "../../extention/load";
import CurrentAccess from "./current_access";
import OndayAccess from "./onday_access";
import DeviceQuantity from "./device_quantity";
import AdQuantity from "./ad_quantity";
import {socket} from '../admin';
class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			customers: [],
			data_filter: [], // data used in chart
			isLoad: true,
			device_quantity: null,
			ad_quantity: null,
			client_access: [],
			client_quantity: null,
		};
	}
	componentDidMount() {
		var {
			customers,
			data_filter,
			device_quantity,
			ad_quantity,
		} = this.state;
		if (customers.length <= 0) this.onLoadCustomers();
		if (data_filter.length <= 0) this.onLoadFilter();
		if (!device_quantity) this.onLoadQuantityDevice();
		if (!ad_quantity) this.onLoadQuantityMedia();
		var { client_access } = this.state;
		socket.on("bus", (socket) => {
			console.log(socket , "=========================")
			if (socket.message_type === "heart_beat") {
				if (client_access.length === 0) {
					client_access.push({
						device_id: socket.id.toLowerCase(),
						clients: socket.data.number_of_sessions,
					});

					this.setState({
						client_access,
						client_quantity: this.onCalculatingNumberOfSession(
							client_access
						),
					});
					return;
				}

				var index = -1;
				index = client_access.findIndex((device) => {
					return (
						device.device_id.toLowerCase() === socket.id.toLowerCase()
					);
				});
				if (index < 0) {
					client_access.push({
						device_id: socket.id.toLowerCase(),
						clients: socket.data.number_of_sessions,
					});
				} else {
					client_access[index].clients = socket.data.number_of_sessions;
					console.log(
						"Số lượng clients 2:", this.onCalculatingNumberOfSession(client_access));
					this.setState({
						client_access,
						client_quantity: this.onCalculatingNumberOfSession(
							client_access
						),
					});
				}
					
			}
		});
		// ============================//DISCONNECT //=========================
		socket.on("device_disconnection", (device_id) => {
			var index = -1;
			console.log("DISCONNECT", device_id)
			index = client_access.findIndex((device) => {
				return (
					device.device_id.toLowerCase() === device_id.toLowerCase()
				);
			});
			if (index !== -1) {
				client_access.splice(index, 1);
				this.setState({
					client_access,
					client_quantity: this.onCalculatingNumberOfSession(
						client_access
					),
				});
			}
		});
		var that = this;
		var clientTimeout = setTimeout(()=>{
			if(that.state.client_quantity===null) {
				that.setState({client_quantity: 'Tải lại'})
			}
			clearTimeout(clientTimeout);
		},15000)
	}

	onCalculatingNumberOfSession = (data) => {
		var numberOfClients = 0;
		data.forEach((element) => {
			numberOfClients += parseInt(element.clients);
		});
		return numberOfClients;
	};

	onLoadCustomers = async () => {
		this.setState({
			isLoad: true,
		});
		axios()
			.get("/api/get_wifi_customer")
			.then((customers) => {
				if (customers.status === 200) {
					this.setState({
						customers: customers.data,
						isLoad: false,
					});
				}
			})
			.catch((err) => {
				if(err.response){
					if(err.response.status===401){
						alert("Bạn cần đăng nhập lại")
						localStorage.removeItem('token');
					}
				}
				
			});
	};

	onLoadQuantityDevice = () => {
		this.setState({
			isLoad: true,
		});
		axios()
			.get("/api/device")
			.then((res_devices) => {
				if (res_devices.status === 200)
					this.setState({
						device_quantity: res_devices.data.length,
					});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	

	onLoadQuantityMedia = () => {
		this.setState({
			isLoad: true,
		});
		axios()
			.get("/api/get_upload")
			.then((res) => {
				if (res.status === 200)
					this.setState({
						ad_quantity: res.data.length,
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	onLoadFilter = () => {
		this.setState({
			isLoad: true,
		});
		axios()
			.get("/api/filter_wifi_visitor")
			.then((data) => {
				var data_filter = data.data.map((element, index) => {
					return {
						x: new Date(element._id),
						y: element.count,
					};
				});
				this.setState({
					data_filter,
					isLoad: false,
				});
			});
	};

	render() {
		var { customers } = this.state;
		var show_customers = customers.map((customer, index) => {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{customer.name}</td>
					<td>{customer.email}</td>
					<td>{customer.phone}</td>
					<td>{customer.up_time}</td>
				</tr>
			);
		});
		return (
			<div>
				<div className="row">
					<CurrentAccess quantity={this.state.client_quantity} />
					<OndayAccess quantity={this.state.data_filter[0]} />
					<DeviceQuantity quantity={this.state.device_quantity} />
					<AdQuantity quantity={this.state.ad_quantity} />
				</div>
				<div className="row">
					<div className="col-md-12" style={{ overflow: "hidden" }}>
						<div className="card">
							<div className="card-body">
								{this.state.isLoad ? (
									<Load />
								) : (
									<Char data={this.state.data_filter} />
								)}
							</div>
							<div className="card-footer">
								<div className="stats">
									<i className="material-icons">
										access_time
									</i>{" "}
									updated 4 minutes ago
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<div className="card">
							<div className="card-header card-header-primary">
								<h4 className="card-title ">
									Thông tin truy cập
								</h4>
								<p className="card-category">
									{" "}
									khách hàng truy cập vào hệ thống wifi
								</p>
							</div>
							<div className="card-body">
								<div className="table-responsive">
									<table className="table">
										<thead className=" text-primary">
											<tr>
												<th>STT</th>
												<th>Người truy cập</th>
												<th>Điện thoại</th>
												<th>Email</th>
												<th>Thời gian</th>
											</tr>
										</thead>
										<tbody>{show_customers}</tbody>
									</table>
									{this.state.isLoad && <Load />}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Index;
