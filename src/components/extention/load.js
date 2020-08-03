import React from 'react';
const Load = (props) =>{
    return (
        <div style={{textAlign:"center"}}>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
export default Load;