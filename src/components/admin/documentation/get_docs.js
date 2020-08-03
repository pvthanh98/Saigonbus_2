import React from 'react';
import LoginAPI from './apis/login_API';
import UserInfoAPI from './apis/user_info_API';
class Documentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-header card-header-primary">
                        <h4 className="card-title">Hướng dẫn sử dụng API</h4>
                        <p className="card-category">Danh sách các API khả dụng</p>
                    </div>
                    <div className="card-body">
                        <LoginAPI />
                        <UserInfoAPI />
                    </div>
                </div>
            </div>
        )
    }
}

export default Documentation