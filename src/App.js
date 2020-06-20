import React from 'react';
import './index.css';
import {Speaker} from "./Speaker";
import {Quote} from "./Quote";
import {RefreshButton} from "./RefreshButton";
import {InputArea} from "./InputBox";
import {TextMatcher} from "./TextMatcher";

let quotes = require('./data.json');

class App extends React.Component {
	constructor(props) {
		super(props);
		this.textMatcher = new TextMatcher(quotes);

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
				<InputArea onClick={(text) => this.handleUserEntry(text)}/>
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

	handleUserEntry(text) {
		this.setState({isLoading: true});

		let quote = this.textMatcher.matchQuote(text);
		setTimeout(() => {
			this.setState({isLoading: false, quote: quote});}, 1000);
		this.setState({quote: quotes[Math.floor(Math.random() * quotes.length)]});
	}
}

export default App;

