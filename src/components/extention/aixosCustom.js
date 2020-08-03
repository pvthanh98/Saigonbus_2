import axios from "axios";

const axiosCustom = ()=>{
	const axiosIns = axios.create({
		baseURL: "https://sensorhub.tech/",
		timeout: 5000,
		headers: {
			authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});
	axiosIns.interceptors.response.use(
		function (response) {
			console.log("INTERCEPTER")
			return response;
		},
		function (error) {
			return Promise.reject(error);
		}
	);

	return axiosIns;
}

export default axiosCustom;
