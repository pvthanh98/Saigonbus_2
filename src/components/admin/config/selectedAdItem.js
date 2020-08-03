import React from 'react';
import clearIcon from './criss-cross.svg';
const SelectedAdItem = (props) =>{
    const onSelectAd = (ad) =>{
        props.onSelectAd(ad);
    }
    return <li>
                <img 
                    className="mr-2" 
                    src={clearIcon} width="15px"  
                    style={{cursor:"pointer"}}
                    onClick={()=>onSelectAd(props.ad)}
                />
                {props.ad} 
            </li>;
}

export default SelectedAdItem;