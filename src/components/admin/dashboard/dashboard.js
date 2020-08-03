import React from 'react';
import LineChar from './linechart';
class Dashboard extends React.Component {
    constructor(props){
        super(props);
    }
    render () {
         return (
            <div className="row">
                <div className="col-12">
                    <LineChar />
                </div>
            </div>  
        );
    }
}

export default Dashboard