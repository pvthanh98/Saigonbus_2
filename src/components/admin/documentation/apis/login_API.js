import React from 'react';
class LoginAPI extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <div className="card">
                    <button type="button" className="btn btn-warning" data-toggle="collapse" data-target="#LoginAPI" role="button" aria-expanded="false" aria-controls="collapseExample">
                        Đăng nhập
                    </button>
                    <div className="collapse" id="LoginAPI">
                        <div>Phương thức: POST</div>
                        <div>Đường dẫn: <i>https://sensorhub.tech/api/login</i></div>
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

export default LoginAPI