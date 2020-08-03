import React from 'react';
class UserInfoAPI extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className="card">
                    <button type="button" className="btn btn-success" data-toggle="collapse" data-target="#UserInfoAPI" role="button" aria-expanded="false" aria-controls="collapseExample">
                        Thông tin người dùng
                    </button>
                    <div className="collapse" id="UserInfoAPI">
                        <div>Phương thức: GET</div>
                        <div>Đường dẫn: <i>https://sensorhub.tech/api/me</i></div>
                        <div>Header Example:</div>
                        <div className="card card-body text-success bg-dark">
                            {'{'}
                            {'}'}
                        </div>
                        <div>Body Example:</div>
                        <div className="card card-body text-success bg-dark">
                            {'{'}
                            {'}'}
                        </div>
                        <div>Result Example:</div>
                        <div className="card card-body text-success bg-dark">                           
                            {'{'}
                            {'}'}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserInfoAPI