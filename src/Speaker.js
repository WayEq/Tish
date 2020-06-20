import React from "react";

export class Speaker extends React.Component {
    render() {
        return (<div className="centered">
                <VoiceList voices={this.props.voices} onChange={voice => this.props.onChange(voice)}/>
                <SpeakButton voice={this.props.voice} quote={this.props.quote}/>
            </div>
        );
    }
}

class SpeakButton extends React.Component {
    render() {
        return(<button className="nice-button" onClick={() => this.speak()}>Speak!</button>);
    }

    speak() {
        let utterance = new SpeechSynthesisUtterance(this.props.quote);
        utterance.voice = speechSynthesis.getVoices().find(element => element.name === this.props.voice);
        speechSynthesis.speak(utterance);
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