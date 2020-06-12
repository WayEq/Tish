import React from 'react';
import Tail from './Tail';
import './index.css';
import refresh from './refresh.png'
import loading from './loading.gif'

let quotes = require('./data.json');

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quote: quotes[Math.floor(Math.random() * quotes.length)],
			voices : speechSynthesis.getVoices(),
			voice: null,
			isLoading: false 
		};

		speechSynthesis.onvoiceschanged = () =>  this.setState({voices : speechSynthesis.getVoices()});
		speechSynthesis.getVoices();
	}

	render() {
		return(<div className="container centered">
				<Quote value={this.state.quote} isLoading={this.state.isLoading}  />
				<br />
				<br />
				<br />
				<Speaker voice={this.state.voice} voices={this.state.voices} quote={this.state.quote} onChange={voice => this.handleSpeakerChange(voice)} />
				<br />
				<RefreshButton onClick={() => this.handleRefreshQuote()} />
				</div>
		);
	}
	
	handleSpeakerChange(newVoice) {
		this.setState({voice: newVoice});
	}

	handleRefreshQuote() {
		this.setState({isLoading: true});
		setTimeout(() => { this.setState({isLoading: false, quote: quotes[Math.floor(Math.random() * quotes.length)]});}, 1000); 
		this.setState({quote: quotes[Math.floor(Math.random() * quotes.length)]});	
	}
}

class Speaker extends React.Component {
	render() {
		return (<div className="centered" >
				<VoiceList voices={this.props.voices} onChange={voice => this.props.onChange(voice)} /> 
				<SpeakButton voice={this.props.voice} quote={this.props.quote}  />
			</div>
		);
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

class SpeakButton extends React.Component {
   render() {
		return(<button onClick={() => this.speak()}>Speak!</button>);
	}

	speak() {
	   var utterance = new SpeechSynthesisUtterance(this.props.quote);
	   utterance.voice = speechSynthesis.getVoices().find(element => element.name === this.props.voice);
		speechSynthesis.speak(utterance);
	}
}

class RefreshButton extends React.Component {
	constructor(props) {
		super(props);
		this.icon = React.createRef();
	
	}	
	render() {
	
		return (<div className="centered"> <img ref={this.icon} onClick={() =>  {this.props.onClick()}} alt="refresh" width="50px" height="50px" src={refresh} /></div>);
	}

}

class Quote extends React.Component {
	render() {
		var content = (<img className="loading" height="40%" width="30%" src={loading} /> );
		if (! this.props.isLoading) {
			content = this.props.value;
		}
		return (<div id="container" className="speech-bubble"><div className="left">{content}</div><Tail /> </div>);
	}
}

export default App;

