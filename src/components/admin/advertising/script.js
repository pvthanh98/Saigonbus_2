import React, { Component } from 'react';
import ScriptTag from 'react-script-tag';
 
class Demo extends Component {
    render() {
        return (<ScriptTag isHydrating={true} type="text/javascript" src="some_script.js" />);
    }
}