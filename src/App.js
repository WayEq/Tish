import React from 'react';
import './index.css';
import {Speaker} from "./Speaker";
import {MessageArea} from "./MessageArea";
import {InputArea} from "./InputBox";
import {TextMatcher} from "./TextMatcher";

let quotes = require('./data.json');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.textMatcher = new TextMatcher(quotes);
        let randomQuote = this.textMatcher.getRandomQuote();
        this.state = {
            messageHistory: [
                {
                direction : "incoming",
                quote: randomQuote
            }
            ],
            voices: speechSynthesis.getVoices(),
            voice: null,
            isLoading: false
        };


        speechSynthesis.onvoiceschanged = () => this.setState({voices: speechSynthesis.getVoices()});
        speechSynthesis.getVoices();
    }


    render() {
        return (<div className="container">
                <MessageArea messageHistory={this.state.messageHistory} isLoading={this.state.isLoading}/>
                <InputArea onClick={(text) => this.handleUserEntry(text)}/>
                <br/>
                <br/>
                <br/>
                <Speaker onClick={() => this.speak() }voice={this.state.voice} voices={this.state.voices} quote={this.state.messageHistory}
                         onChange={voice => this.handleSpeakerChange(voice)}/>
                <br/>
            </div>
        );
    }
    speak() {
        let text = this.state.messageHistory[this.state.messageHistory.length-1].quote;
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = speechSynthesis.getVoices().find(element => element.name === this.state.voice);
        speechSynthesis.speak(utterance);
    }

    handleSpeakerChange(newVoice) {
        this.setState({voice: newVoice});
    }

    handleUserEntry(text) {

        this.state.messageHistory.push({quote : text, direction : "outbound"})
        this.setState({isLoading: true, messageHistory: this.state.messageHistory});
        setTimeout(() => {
            this.state.messageHistory.push({quote: this.textMatcher.matchQuote(text), direction: "incoming"})
            this.speak()
                this.setState({isLoading: false, messageHistory: this.state.messageHistory});
            }, 1000);

    }
}

export default App;

