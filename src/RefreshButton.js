import React from "react";
import refresh from "./refresh.png";

export class RefreshButton extends React.Component {
    constructor(props) {
        super(props);
        this.icon = React.createRef();

    }

    render() {

        return (<div className="centered"><img ref={this.icon} onClick={() => {
            this.props.onClick()
        }} alt="refresh" width="50px" height="50px" src={refresh}/></div>);
    }

}