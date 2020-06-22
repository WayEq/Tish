import React from "react";
import loading from "./loading.gif";

export class MessageArea extends React.Component {

    render() {

        return (<div>
            {this.props.messageHistory.map((message) => {
                return (
                    <Message direction={message.direction} message={message.quote}/>)
            })}
            <div hidden={!this.props.isLoading}>
            <div id="container" className="speech-bubble">
                <img alt="loading" className="loading" height="40%" width="30%" src={loading}/>
                <Tail />
            </div>
            </div>

        </div>);
    }
}


class Message extends React.Component {
    render() {
        let selector = "left"
        let type = this.props.direction + " speech-bubble"
        if (this.props.direction === "outbound") {
            selector = "right"
        }
        return (<div className={selector}>
            <div id="container" className={type}>
                {this.props.message}
            <Tail direction={this.props.direction} />
            </div>
        </div>)
    }
}


class Tail extends React.Component {
    render() {
        let selector = "tail-left"
        if (this.props.direction === "outbound") {
            selector = "tail-right"
        }
        return (<div className={selector}/>);
    }
}
