import React from "react";

export class InputArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null
        }
    }

    render() {
        return (<InputBox onChange={text => this.props.onClick(text)}/>);
    }
}

export class InputBox extends React.Component {

    render() {
        return (<input ref={this.inputBox} onKeyPress={(event) => {
            this.process(event, this)
        }
        } className="userText" type="text" id="user-text"/>)
    }

    process(event, input) {
        if (event.key === "Enter") {
            this.props.onChange(event.target.value)
            event.target.value = '';
        }
    }
}