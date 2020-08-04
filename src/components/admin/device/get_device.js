import React from "react";
import axios from "axios";
import Load from "../../extention/load";
import FormAdd from "./form_add";
import { Link } from "react-router-dom";
import ActiveBluePrint from "./active_blueprint";
import tick from "../../../tick.png";
import { animateScroll as scroll } from "react-scroll";
import busImg from "../../../asset/img/bus.png";
import DeviceDetail from './deviceDetail';

import { socket } from "../admin";
var async = require("async");

class Device extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			devices: [],
			load: true,
			loadAddDevice: false,
			device_active: "DCA6321876B6", // dùng để xác định device đưa dữ liệu vào modals
		};
	}
	componentWillMount() {
		socket.on("bus", (dataSocket) => {
			if (dataSocket.message_type === "heart_beat") {
				console.log(dataSocket);
				var { devices } = this.state;
				if (devices.length !== 0) {
					var index = devices.findIndex((device) => {
						return (
							device.device_id.toLowerCase() ===
							dataSocket.id.toLowerCase()
						);
					});
					if (index !== -1) {
						var now = new Date();
						devices[index].status.isActive = true;
						var hour =
							now.getHours() < 10
								? "0" + now.getHours()
								: now.getHours();
						var minute =
							now.getMinutes() < 10
								? "0" + now.getMinutes()
								: now.getMinutes();
						var second =
							now.getSeconds() < 10
								? "0" + now.getSeconds()
								: now.getSeconds();

						var day =
							now.getDate() < 10
								? "0" + now.getDate()
								: now.getDate();

						var month =
							now.getMonth() < 10
								? "0" + now.getMonth()
								: now.getMonth();

						var year = now.getFullYear();
						devices[
							index
						].status.time = `${day}-${month}-${year} | ${hour}:${minute}:${second}`;
						devices[index].data = dataSocket.data; // cap nhat gia tri cua cpu
					}
					this.setState(devices);
				}
				// cap nhat gia tri tu socket vao devices

				//========================================
			}
		});

		socket.on("device_disconnection", (device_id) => {
			var { devices } = this.state;
			if (devices.length !== 0) {
				var index = devices.findIndex((device) => {
					return (
						device.device_id.toLowerCase() ===
						device_id.toLowerCase()
					);
				});
				if (index !== -1) {
					devices[index].status.isActive = false;
				}
				this.setState(devices);
			}
		});
	}
	// "Truy cập: " + `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` ;
	isAddingDevice = (isAdding) => {
		if (isAdding === false) this.onLoadDevice();
		this.setState({
			loadAddDevice: isAdding,
		});
	};

	onLoadDevice = () => {
		var that = this;
		this.setState({
			load: true,
		});
		async.parallel(
			{
				devices: function (callback) {
					async.waterfall(
						[
							function (callback_water) {
								axios
									.get("https://sensorhub.tech/api/device", {
										headers: {
											Authorization: `Bearer ${localStorage.getItem(
												"token"
											)}`,
										},
									})
									.then(function (res_devices) {
										if (res_devices.status === 200)
											callback_water(
												null,
												res_devices.data
											);
									})
									.catch((error) => {
										if (error.status === 401) {
											alert("Bạn cần đăng nhập lại");
											localStorage.removeItem("token");
										}

										callback_water("unauthorized", null);
										localStorage.removeItem("token");
									});
							},
							function (devices, callback_water2) {
								async.map(
									devices,
									function (device, cb) {
										if (device.device_id != "") {
											axios
												.get(
													"https://sensorhub.tech/api/get_device_info/" +
														device.device_id,
													{
														headers: {
															Authorization: `Bearer ${localStorage.getItem(
																"token"
															)}`,
														},
													}
												)
												.then(function (
													res_devices_info
												) {
													cb(
														null,
														res_devices_info.data
													);
												})
												.catch((error) => {
													console.log(error);
												});
										} else {
											cb(null, {});
										}
									},
									callback_water2
								);
							},
						],
						callback
					);
				},

				blueprints: function (callback) {
					axios
						.get("https://sensorhub.tech/api/get_user_blueprint", {
							headers: {
								Authorization: `Bearer ${localStorage.getItem(
									"token"
								)}`,
							},
						})
						.then((blueprint_config) => {
							if (blueprint_config.status === 200) {
								callback(null, blueprint_config.data);
							}
						})
						.catch((err) => {
							console.log(err);
						});
				},
			},
			function (err, result) {
				var { devices, blueprints } = result;
				if (devices) {
					devices = devices.map((device) => {
						if (device)
							return {
								...device,
								status: {
									isActive: false,
									time: "Đang cập nhật...",
								},
							};
						return {};
					});
					that.setState({
						devices: devices,
						blueprints: blueprints,
						load: false,
					});
				}
			}
		);
	};

	onUpdateConfigSuccess = (isOk) => {
		if (isOk === "completed") {
			this.onLoadDevice();
		}
	};

	componentDidMount() {
		if (this.state.devices.length <= 0) this.onLoadDevice();
		scroll.scrollToTop();
	}

	onDeleteDevice = (device_id) => {
		axios
			.delete("https://sensorhub.tech/api/provision", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data: {
					device_id: device_id,
				},
			})
			.then((res) => {
				if (res.status === 200) this.onLoadDevice();
			})
			.catch((err) => console.log(err));
	};

	onHandleIdDevice = (id) => {
		this.setState({ device_active: id });
	};

	render() {
		let { devices, load, loadAddDevice, device_active } = this.state;
		let deviceDetails;
		if (devices.length > 0) {
			deviceDetails = devices.filter((e) => {
				return (
					e.device_id.toLowerCase() ===
					device_active.toLocaleLowerCase()
				);
			})[0];
		}
		let cpu_temp = "",
			cpu_usage = "",
			number_of_sessions = "",
			ram = "",
			ramTotal = "",
			driver="",
			assistant="",
			assistant_img = "",
			driver_img = "";

		if (deviceDetails && deviceDetails.data) {
			cpu_temp = deviceDetails.data.cpu_temp;
			cpu_usage = deviceDetails.data.cpu_usage;
			number_of_sessions = deviceDetails.data.number_of_sessions;
			ram = deviceDetails.data.ram.available;
			ramTotal = deviceDetails.data.ram.total;
			driver = deviceDetails.bus_driver;
			assistant = deviceDetails.assistant;
			assistant_img = deviceDetails.assistant_img;
			driver_img = deviceDetails.driver_img;
		}
		return (
			<div className="col-md-12">
				<div className="card">
					<div className="card-header card-header-primary">
						<h4 className="card-title ">Thiết bị</h4>
						<p className="card-category">Danh sách các thiết bị</p>
					</div>
					<div className="card-body">
						<div className="table-responsive">
							<button
								type="button"
								className="btn btn-round btn-fill btn-info"
								data-toggle="modal"
								data-target="#add_device"
							>
								<b>+ </b> Thêm mới
							</button>
							{loadAddDevice ? <Load /> : ""}
							<FormAdd isAddingDevice={this.isAddingDevice} />
							<table className="table">
								<thead className=" text-primary">
									<tr>
										<th>Loại</th>
										<th>Mã thiết bị</th>
										<th>Biển số</th>
										<th>Cấu hình</th>
										<th>Tín hiệu</th>
										<th>Truy cập lần cuối</th>
										<th className="text-center">
											Tùy chọn
										</th>
									</tr>
								</thead>
								<tbody>
									{devices.map((device, index) => {
										if (device)
											return (
												<tr key={index}>
													<td>
														{/* {" "}
														<img
															src={busImg}
															width="60px"
														/>{" "} */}
														<a
															onClick={() =>
																this.onHandleIdDevice(
																	device.device_id
																)
															}
															style={{
																cursor:
																	"pointer",
															}}
															data-toggle="modal"
															data-target="#deviceDetail"
														>
															{
																<img
																	src={busImg}
																	width="60px"
																/>
															}
														</a>
													</td>
													<td>{device.device_id}</td>
													<td>
														{device.device_name}
													</td>
													<td>
														<ActiveBluePrint
															device_id={
																device.device_id
															}
															blueprints={
																this.state
																	.blueprints
															}
															blueprint_id={
																device.blueprintId
															}
															onUpdateConfigSuccess={
																this
																	.onUpdateConfigSuccess
															}
															onUpdateConfig={
																this
																	.onUpdateConfig
															}
														/>
													</td>
													<td>
														{device.status
															.isActive ? (
															<div
																style={{
																	textAlign:
																		"center",
																}}
															>
																<img
																	src={tick}
																	width="30px"
																/>
															</div>
														) : (
															<p
																style={{
																	textAlign:
																		"center",
																}}
															>
																Đang chờ tín
																hiệu
															</p>
														)}
													</td>
													<td>
														<p
															style={{
																textAlign:
																	"center",
															}}
														>
															{device.status.time}
														</p>
													</td>
													<td className="text-center">
														<Link
															to={
																"/device/modify/" +
																device.device_id
															}
															className="btn btn-round btn-fill btn-info"
														>
															<span className="glyphicon glyphicon-edit"></span>{" "}
															Sửa
														</Link>
														<br />
														<a
															className="btn btn-round btn-fill btn-info btn-delete-custom"
															onClick={() =>
																this.onDeleteDevice(
																	device.device_id
																)
															}
														>
															<span className="glyphicon glyphicon-remove"></span>{" "}
															Xóa
														</a>
													</td>
												</tr>
											);
									})}
								</tbody>
							</table>
							{load ? <Load /> : ""}
						</div>
					</div>
				</div>
				{/*  */}
				<div
					className="modal fade"
					id="deviceDetail"
					tabindex="-1"
					role="dialog"
					aria-labelledby="exampleModalCenterTitle"
					aria-hidden="true"
				>
					<div
						className="modal-dialog modal-dialog-centered"
						role="document"
					>
						<div className="modal-content">
							<div className="card">
								<div className="card-header card-header-warning">
									<h5 className="modal-title" id="exampleModalLongTitle">
										Thông tin chi tiết thiết bị{" "}
										{this.state.device_active}
									</h5>
									<button
										type="button"
										className="close"
										data-dismiss="modal"
										aria-label="Close"
									>
										<span aria-hidden="true">
											&times;
										</span>
									</button>
								</div>
								<div>
									<div className="modal-body">
										<DeviceDetail 
											driver={driver} 
											assistant={assistant}
											driver_img={driver_img}
											assistant_img={assistant_img}
											cpu_usage={cpu_usage} 
											cpu_temp={cpu_temp} 
											number_of_sessions={number_of_sessions}
											ram={ram}
											ramTotal={ramTotal}
										/>
									</div>
								</div>
								<button
									type="button"
									className="btn btn-secondary"
									data-dismiss="modal"
								>
									<strong>Close</strong>
								</button>
							</div>
						
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Device;
