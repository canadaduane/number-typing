import React, { Component } from 'react';
// 674 x 480
import logo from './daddy-daughter.png';
// 2578 x 1027
import fingers from './fingers-keys.jpg';

import './App.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Tooltip } from 'react-lightweight-tooltip';

const challenges = [
  "55443322116677889900",
  "12345678901234567890",
  "12121213309090909088",
  "34343435587878787866",
  "56475647564756475647",
  "47261858698274854717",
  "18346292109387579313",
  "55443322116677889900",
  "48467162795663621312",
  "12345678901234567890",
  "10293847564738291029",
  "12121213309090909088",
  "12345251321221543532",
  "67890769780980796870",
  "17380172927465738291",
  "05948372611627384950",
]

// type key =
//  | key: string
//  | errorHistory: string

const newAnswer = () => {
  return {
    key: "",
    errorHistory: "",
  }
}
// Tooltip Styles
const tooltipStyles = {
  wrapper: { color: '' },
  tooltip: { 
    border: '1px solid white',
    paddingBottom: '12px',
    minWidth: '',
  },
  content: {
    color: '#ff2111',
  },
  arrow: {
  }
}

class App extends Component {
  state = {
    currentChallenge: 0,
    currentIndex: 0,
    currentAnswers: [],
    historicalAnswers: [],
    answer: newAnswer(),
  }

  correctKey() {
    return this.currentChallengeSequence().charAt(this.state.currentIndex)
  }

  currentChallengeSequence() {
    return challenges[this.state.currentChallenge]
  }

  keysSoFar() {
    return this.state.currentAnswers.map((a) => a.key).join("")
  }

  keysSoFarWithMarkup(answers = this.state.currentAnswers) {
    return answers.map(
      (a, i) => (a.errorHistory.length > 0
        ? <Tooltip key={i} content={a.errorHistory} styles={tooltipStyles}>
            <span className="Key Error">{a.key}</span>
          </Tooltip>
        : <span className="Key Correct" key={i}>{a.key}</span>
      )
    )
  }

  handleKeyPress(key, e) {
    this.setState({
      answer: {
        key: key,
        errorHistory: this.state.answer.errorHistory + (key === this.correctKey() ? '' : key)
      }
    }, () => {
      const answer = this.state.answer
      if (answer.key === this.correctKey()) {
        // Correct answer; add answer to currentAnswers
        // console.log("prevState", prevState, "historicalAnswers", this.state.historicalAnswers)
        const updatedCurrentAnswers = this.state.currentAnswers.concat(answer)
        this.setState({
          currentIndex: this.state.currentIndex + 1,
          currentAnswers: updatedCurrentAnswers,
          answer: newAnswer(),
        }, () => {
          // Move on to next challenge if current one is complete
          if (this.keysSoFar() === this.currentChallengeSequence()) {
            this.setState({
              currentChallenge: this.state.currentChallenge + 1,
              currentIndex: 0,
              currentAnswers: [],
              historicalAnswers: this.state.historicalAnswers
                .concat([updatedCurrentAnswers]),
              answer: newAnswer(),
            })
          }
        })
      } else {
        // Incorrect answer
      }
    })
  }

  render() {
    const whiteTooltip = Object.assign({}, tooltipStyles)
    whiteTooltip.content = Object.assign({}, tooltipStyles.content, {color: 'white'})
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Number Typing</h1>
        </header>
        <div className="App-intro">
          Typing Practice for the 0-9 Keys!
          <p>Here's your practice set:</p>
          <div className="Challenge">
            {challenges[this.state.currentChallenge]}
          </div>
          <div className="Answers">
            {this.keysSoFarWithMarkup()}<span className="Caret">^</span>
          </div>
          <div className="History">
            {this.state.historicalAnswers.slice().reverse().map((h, i) => {
              return <div key={i} className="Historical">{this.keysSoFarWithMarkup(h)}</div>
            })}
          </div>
          <KeyboardEventHandler
            handleKeys={['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']}
            onKeyEvent={this.handleKeyPress.bind(this)} />
        </div>
        <div className="Fingers">
          <Tooltip content="Placement of fingers for quick number entry." styles={whiteTooltip}>
            <img src={fingers} className="Fingers-img" alt="finger placement" />
          </Tooltip>
        </div>
        <div className="Authors">
          <Tooltip content="The author, canadaduane, and his daughter." styles={whiteTooltip}>
            <img src={logo} className="App-logo" alt="logo" />
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default App;
