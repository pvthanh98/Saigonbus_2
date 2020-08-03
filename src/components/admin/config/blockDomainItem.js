import React from 'react';
import clearIcon from './criss-cross.svg'
const BlockDomainItem = (props) =>{
    const onSelectDomain = (domain) =>{
        props.onSelectDomain(domain);
    }
    return <li >
        <img 
            className="mr-2" 
            src={clearIcon} width="15px"  
            style={{cursor:"pointer"}}
            onClick={()=>onSelectDomain(props.domain)}
        />
            {props.domain}
        </li>;
}

export default BlockDomainItem;