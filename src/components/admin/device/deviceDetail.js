import React from "react";
export default function DeviceDetail(props) {
    const { driver, assistant, driver_img, assistant_img , cpu_usage, cpu_temp, number_of_sessions, ram, ramTotal} = props;
	return (
		<table className="deviceDetailTable w-100">
			<tbody>
				<tr>
					<td>
						<i className="material-icons">people</i> Tài xế
					</td>
					<td>
                        <img className="avt_img mr-2" src={"https://sensorhub.tech/uploads/media/" + driver_img}  />
                        {driver}
                    </td>
				</tr>
				<tr style={{ borderBottom: "1px solid #d8d8d8" }}>
					<td>
						<i className="material-icons">people</i> Phụ Xe
					</td>
					<td>
                        <img className="avt_img mr-2" src={"https://sensorhub.tech/uploads/media/"+ assistant_img}/>
                        {assistant}
                    </td>
				</tr>

				<tr>
					<td>
						<i className="material-icons">select_all</i>
						Sử dụng CPU
					</td>
					<td>{cpu_usage} %</td>
				</tr>
				<tr>
					<td>
						<i className="material-icons">ac_unit</i> Nhiệt độ
						CPU
					</td>
					<td>{cpu_temp} <img src="/images/temperature.svg" width="20px" />  </td>
				</tr>
				<tr>
					<td>
						<i className="material-icons">people</i> Số lượng truy
						cập:
					</td>
					<td>{number_of_sessions} người</td>
				</tr>
				<tr>
					<td>
						<i className="material-icons">memory</i>
						Ram
					</td>
					<td>
						{ram} / {ramTotal} bytes
					</td>
				</tr>
			</tbody>
		</table>
	);
}
