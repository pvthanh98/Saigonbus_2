import React from "react";
import axios from "../../extention/aixosCustom";
import Load from "../../extention/load";
import BlockDomainItem from "./blockDomainItem";
import BlockServiceItem from "./blockServiceItem";
import {BlueprintValidate} from '../../validate/validate';
import {animateScroll as scroll} from 'react-scroll';
import "./style.css";
// import FormAdd from './form_add';
// import { Link } from 'react-router-dom';
class Config extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blueprints: [],
			ads: [],
			ad_media_name: "", // name of select tag
			b_name: "",
			b_media: "",
			b_redirect_link: "",
			b_domain_input: "", // restricted input
			b_service_input: "",
			b_restricted_domain: [],
			b_restricted_service: [],
			b_max_clients: "",
			b_session_timeout: "",
			b_auth_idle_timeout: "",
			b_turn_on_time: "",
			b_shutdown_time: "",
			isLoad: true,
			selectedBlueprint: "",
			msg: ""
		};

		this.restricted_domain_ref = React.createRef();
		this.restricted_servic_ref = React.createRef();
	}

	componentDidMount() {
		this.onLoadConfig();
		scroll.scrollToTop();
	}

	async onLoadConfig() {
		var blueprints = [];
		var ads = [];
		this.setState({
			isLoad: true,
		});
		await axios()
			.get("/api/get_user_blueprint")
			.then((res) => {
				if (res.status === 200) {
					blueprints = res.data;
				}
			})
			.catch((err) => {
				alert("Bạn đăng nhập lại")
        		localStorage.removeItem('token');
			});

		await axios()
			.get("/api/get_upload")
			.then((res) => {
				if (res.status === 200) ads = res.data;
				scroll.scrollToTop();
			})
			.catch((err) => {
				console.log(err)
			});

		this.setState({
			blueprints: blueprints,
			ads: ads,
			ad_media_name: blueprints[0] ? blueprints[0].data.media[0].substr(
				blueprints[0].data.media[0].lastIndexOf("/") + 1
			)  : ads.length > 0 ? ads[0].media_name: "",
			selectedBlueprint:blueprints[0] ?  blueprints[0]._id :"",
			b_name:blueprints[0] ?  blueprints[0].name :"",
			b_media: blueprints[0] ?  blueprints[0].data.media[0] 
			: ads.length > 0 ? "https://sensorhub.tech/uploads/media/"+ ads[0].media_name:"",
			b_redirect_link:blueprints[0] ?  blueprints[0].data.redirect_link :"",
			b_restricted_domain:blueprints[0] ?  blueprints[0].data.restricted_domain :[],
			b_restricted_service:blueprints[0] ?  blueprints[0].data.restricted_service :[],
			b_max_clients: blueprints[0] ?  blueprints[0].data.max_clients :"",
			b_session_timeout:blueprints[0] ?  parseInt(blueprints[0].data.session_timeout) :"",
			b_auth_idle_timeout:blueprints[0] ?  blueprints[0].data.auth_idle_timeout :"",
			b_turn_on_time:blueprints[0] ?  blueprints[0].data.turn_on_time :"",
			b_shutdown_time: blueprints[0] ? blueprints[0].data.shutdown_time :"",
			isLoad: false,
			isModify: blueprints.length<=0 ? false : true
		});
	}

	onChangeBlueprint = (e) => {
		var index = this.state.blueprints.findIndex((blueprint) => {
			return blueprint._id === e.target.value;
		});
		var { blueprints } = this.state;
		this.setState({
			[e.target.name]: e.target.value,
			isModify: true,
			ad_media_name: blueprints[index].data.media[0].substr(
				blueprints[index].data.media[0].lastIndexOf("/") + 1
			),
			b_name: blueprints[index].name,
			b_media: blueprints[index].data.media[0],
			b_redirect_link: blueprints[index].data.redirect_link,
			b_restricted_domain: blueprints[index].data.restricted_domain,
			b_restricted_service: blueprints[index].data.restricted_service,
			b_max_clients: blueprints[index].data.max_clients,
			b_session_timeout: parseInt(blueprints[index].data.session_timeout),
			b_auth_idle_timeout: blueprints[index].data.auth_idle_timeout,
			b_turn_on_time: blueprints[index].data.turn_on_time,
			b_shutdown_time: blueprints[index].data.shutdown_time,
		});
	};

	onChangeProperties = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onBlockDomain = (e) => {
		var { b_restricted_domain } = this.state;
		if(this.restricted_domain_ref.current.value !== ""){
			b_restricted_domain.push(this.restricted_domain_ref.current.value);
			this.setState({
				b_restricted_domain: b_restricted_domain,
				b_domain_input: "",
			});
		} else alert("Bạn cần nhập tên miền")
		
	};

	onBlockService = (e) => {
		var { b_restricted_service } = this.state;
		if(this.restricted_servic_ref.current.value!==""){
			b_restricted_service.push(this.restricted_servic_ref.current.value);
			this.setState({
				b_restricted_service: b_restricted_service,
				b_service_input: "",
			});
		} else alert ("Bạn cần nhập tên dịch vụ")
		
	};

	onSubmit = (e) => {
		e.preventDefault();
		if(!BlueprintValidate(this.state)){
			alert("Nhập sai định dạng vui lòng kiểm tra lại");
			return
		}
		var body = {
			name: this.state.b_name,
			data: {
				media: [this.state.b_media],
				redirect_link: this.state.b_redirect_link,
				restricted_domain: this.state.b_restricted_domain,
				restricted_service: this.state.b_restricted_service,
				max_clients: parseInt(this.state.b_max_clients),
				session_timeout: parseInt(this.state.b_session_timeout),
				auth_idle_timeout: parseInt(this.state.b_auth_idle_timeout) ,
				shutdown_time: parseInt(this.state.b_shutdown_time),
				turn_on_time: parseInt(this.state.b_turn_on_time),
			},
		};
		if (this.state.isModify) {
			axios()
				.post(
					"/api/update_blueprint/" + this.state.selectedBlueprint, body)
				.then((res) => {
					if (res.status === 200) this.onLoadConfig();
				}).catch(err=>{
					console.log(err)
				});
		} else {
			this.setState({
				isLoad: true,
			});
			axios()
				.post("/api/create_blueprint", body)
				.then((res) => {
					if (res.status === 200) this.onLoadConfig();
				}).catch((err)=>{
					console.log(err)
				});
		}
	};

	onAddBlueprint = (e) => {
		this.setState({
			isModify: false,
			b_name: "",
			b_media: this.state.ads.length>0 ? "https://sensorhub.tech/uploads/media/"+this.state.ads[0].media_name :"",
			ad_media_name:this.state.ads[0].media_name,
			b_redirect_link: "",
			b_domain_input: "", // restricted input
			b_service_input: "",
			b_restricted_domain: [],
			b_restricted_service: [],
			b_max_clients: "",
			b_session_timeout: "",
			b_auth_idle_timeout: "",
			b_turn_on_time: "",
			b_shutdown_time: "",
		});
	};

	onChangeAds = (e) => {
		this.setState({
			ad_media_name: e.target.value,
			b_media: "https://sensorhub.tech/uploads/media/" + e.target.value,
		});
	};

	onDeleteBlueprint = (id) => {
		this.setState({isLoad:true})
		scroll.scrollToTop();
		axios()
			.delete(
				"https://sensorhub.tech/api/delete_blueprint",
				{
					data: { id: this.state.selectedBlueprint }
				}
			)
			.then((res) => {
				if (res.status === 200){
					this.onLoadConfig();
				}
			}).catch(err=>{
				if(err.response && err.response.status === 400){
					alert("Có lỗi: Bảng cài đặt này có thể đang được kích hoạt")
					this.setState({isLoad:false})
				}
			});
	};

	onSelectDomain = (domain) => {
		// for delete block_domain list
		console.log("you selected domain ", domain);
		var { b_restricted_domain } = this.state;
		var index = b_restricted_domain.findIndex((e) => e === domain);
		if (index !== -1) {
			b_restricted_domain.splice(index, 1);
			this.setState({ b_restricted_domain});
		}
	};

	onSelectService = (service) => {
		// for delete block_service list
		console.log("you selected service ", service);
		var { b_restricted_service } = this.state;
		var index = b_restricted_service.findIndex((e) => e === service);
		if (index !== -1) {
			b_restricted_service.splice(index, 1);
			this.setState({ b_restricted_service });
		}
	};
	onCancelSave = () =>{
		scroll.scrollToTop();
		this.onLoadConfig();
		
	}

	render() {
		if(this.state.isLoad) return <Load />
		var { blueprints, ads } = this.state;
		var show_list_blueprints = blueprints.map((blueprint, index) => {
			return (
				<option key={index} value={blueprint._id}>
					{blueprint.name}
				</option>
			);
		});

		var show_ads = ads.map((ad, index) => (
			<option key={index} value={ad.media_name}>
				{ad.media_name}
			</option>
		));

		return (
			<div className="row">
				{this.state.isModify && <div className="col-md-12">
					<div className="card">
						<div className={"card-header card-header-primary"}>
							{this.state.isLoad ? <Load /> : ""}
							<h4 className="card-title ">Chọn cấu hình</h4>
							<p className="card-category">Chọn cấu hình để liệt kê chi tiết</p>
						</div>
						<div className="card-body">
							<select
								value={this.state.selectedBlueprint}
								className="form-control"
								name="selectedBlueprint"
								onChange={this.onChangeBlueprint}
							>
								{show_list_blueprints}
							</select>
							<button
								className="btn btn-round btn-fill btn-info"
								onClick={this.onAddBlueprint}
							>
								<b> + </b> Thêm mới
							</button>
						</div>
					</div>
				</div>
				}
				<div className="col-md-12">
					<div className="card">
						<div className={this.state.isModify ? "card-header card-header-primary" : "card-header card-header-warning"}>
							{this.state.isModify === true
								? <h4 className="card-title ">Thông tin chi tiết</h4>
								: <h4 className="card-title ">Thêm Mới</h4>}
							{this.state.isModify
							? <p className="card-category">Chi tiết cấu hình bên trong</p>
							: <p className="card-category">Nhập thông tin cấu hình</p>}
						</div>
						<div className="card-body">
							<form>
								<div>
									<i className="material-icons">build</i> Tên cấu
									hình
								</div>
								<input
									className="form-control"
									value={this.state.b_name}
									name="b_name"
									onChange={this.onChangeProperties}
									placeholder="Tên cấu hình mới"
								/>
								<div>
									<i className="material-icons">perm_media</i>{" "}
									Quảng cáo
								</div>
								<input
									className="form-control"
									value={this.state.b_media}
									name="b_media"
									onChange={this.onChangeProperties}
									readOnly
									placeholder="Chọn quảng cáo bên dưới"
								/>
								<div>Chọn mới</div>
								<select
									onChange={this.onChangeAds}
									className="custom-select"
									value={this.state.ad_media_name}
								>
									{show_ads}
								</select>
								<div>
									<i className="material-icons">swap_horiz</i>{" "}
									Đường dẫn điều hướng
								</div>
								<input
									className="form-control"
									value={this.state.b_redirect_link}
									name="b_redirect_link"
									onChange={this.onChangeProperties}
									placeholder="Nhập đường dẫn điều hướng"
								/>
								<div>
									<i className="material-icons">warning</i> Chặn
									Tên miền
								</div>
								<input
									className="form-control"
									onChange={this.onChangeProperties}
									ref={this.restricted_domain_ref}
									value={this.state.b_domain_input}
									name="b_domain_input"
									placeholder="Nhập tên miền"
								/>
								<button
									type="button"
									className="btn btn-primary btn-sm"
									onClick={this.onBlockDomain}
								>
									Chặn tên miền
								</button>
								<div>Tên miền đã chặn</div>
								<ul>
									{this.state.b_restricted_domain.map(
										(domain, index) => {
											return (
												<BlockDomainItem key={index}
													domain={domain}
													onSelectDomain={
														this.onSelectDomain
													}
												/>
											);
										}
									)}
								</ul>
								<div>
									<i className="material-icons">report</i> Chặn
									Dịch Vụ
								</div>
								<input
									className="form-control"
									ref={this.restricted_servic_ref}
									placeholder="Nhập dịch vụ"
									onChange={this.onChangeProperties}
									value={this.state.b_service_input}
									name="b_service_input"
								/>
								<button
									type="button"
									className="btn btn-primary btn-sm"
									onClick={this.onBlockService}
								>
									Chặn dịch vụ
								</button>
								<div>Dịch vụ đã chặn</div>
								<ul>
									{this.state.b_restricted_service.map(
										(service, index) => {
											return (
												<BlockServiceItem
													key={index}
													service={service}
													onSelectService={
														this.onSelectService
													}
												/>
											);
										}
									)}
								</ul>
								<div>
									<i className="material-icons">people</i> Số kết
									nối tối đa
								</div>
								<input
									className="form-control"
									value={this.state.b_max_clients}
									name="b_max_clients"
									onChange={this.onChangeProperties}
									placeholder="Tổng số kết nối tối đa"
								/>
								<div>
									<i className="material-icons">av_timer</i> Thời
									lượng kết nối
								</div>
								<input
									className="form-control"
									value={this.state.b_session_timeout}
									name="b_session_timeout"
									onChange={this.onChangeProperties}
									placeholder="Thời lượng truy cập"
								/>
								<div>
									<i className="material-icons">
										perm_contact_calendar
									</i>{" "}
									Auth_idle_timeout
								</div>
								<input
									className="form-control"
									value={this.state.b_auth_idle_timeout}
									name="b_auth_idle_timeout"
									onChange={this.onChangeProperties}
									placeholder="Nhập b_auth_idle_timeout"
								/>
								<div>
									<i className="material-icons">schedule</i> Thời
									gian bật
								</div>
								<input
									className="form-control"
									value={this.state.b_turn_on_time}
									name="b_turn_on_time"
									onChange={this.onChangeProperties}
									placeholder="Nhập thời gian tắt máy"
								/>
								<div>
									<i className="material-icons">work_off</i>Thời
									gian tắt
								</div>
								<input
									className="form-control"
									value={this.state.b_shutdown_time}
									name="b_shutdown_time"
									onChange={this.onChangeProperties}
									placeholder="Nhập thòi gian bật"
								/>
								<button
									type="submit"
									onClick={this.onSubmit}
									className={
										this.state.isModify
											? "btn btn-round btn-fill btn-info"
											: "btn btn-primary"
									}
									data-toggle="modal"
									data-target="#update_blueprint"
								>
									{this.state.isModify
										? "Lưu Thay Đổi"
										: "Lưu Mới"}
								</button>
								{this.state.isModify ? (
									<button
										type="button"
										className="btn btn-round btn-fill btn-info btn-delete-custom"
										onClick={() =>
											this.onDeleteBlueprint(
												this.state.selectedBlueprint
											)
										}
									>
										Xóa
									</button>
								) : <button 
										type="button"
										className="btn btn-danger"
										onClick={this.onCancelSave}
									>
										Hủy
									</button>}
							</form>
							{this.state.isLoad && <Load />}
							{!this.state.isLoad && this.state.isModify && (
								<div className="alert alert-warning mt-3">
									<h4>Lưu ý</h4>
									<span>
										Sau khi chỉnh sửa nội dung cấu hình, bạn
										cần vào trang thiết bị và chọn nút
										refresh để áp dụng thay đổi
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Config;
