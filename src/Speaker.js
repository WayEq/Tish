import React from "react";

export class Speaker extends React.Component {
    render() {
        return (<div className="centered">
                <VoiceList voices={this.props.voices} onChange={voice => this.props.onChange(voice)}/>
                <SpeakButton onClick={() => this.props.onClick()} voice={this.props.voice} quote={this.props.quote}/>
            </div>
        );
    }
}

class SpeakButton extends React.Component {
    render() {
        return(<button className="nice-button" onClick={() => this.props.onClick()}>Speak!</button>);
    }
}


class VoiceList extends React.Component {
    render() {

        return(<select onChange={(e) => this.props.onChange(e.target.value)} >
                {this.props.voices.map(this.addOption)}
            </select>
        );
    }

    addOption(i) {
        return <option className="voice-option" >{i.name}</option>;
    }
}