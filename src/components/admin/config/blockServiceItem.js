import React from 'react';
import clearIcon from './criss-cross.svg';
const BlockServiceItem = (props) =>{
    const onSelectService = (service) =>{
        props.onSelectService(service);
    }
    return <li>
                <img 
                    className="mr-2" 
                    src={clearIcon} width="15px"  
                    style={{cursor:"pointer"}}
                    onClick={()=>onSelectService(props.service)}
                />
                {props.service} 
            </li>;
}

export default BlockServiceItem;