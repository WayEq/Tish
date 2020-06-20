import React from "react";
import loading from "./loading.gif";
import Tail from "./Tail";

export class Quote extends React.Component {
    render() {
        let content = (<img alt="loading" className="loading" height="40%" width="30%" src={loading}/>);
        if (!this.props.isLoading) {
            content = this.props.value;
        }
        return (<div id="container" className="speech-bubble">
            <div className="left">{content}</div>
            <Tail/></div>);
    }
}