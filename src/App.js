import React, { Component } from 'react';
import './App.css';
import InputButton from './InputButton';

const inputButtons = [
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, '.', '=', '+']
];

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      previousInputValue: 0,
      inputValue: 0,
      operator: null
    }
  }
  renderInputButtons = () => {
    console.log(inputButtons.length)
    let views = [];
    for (var r = 0; r < inputButtons.length; r ++) {
      let row = inputButtons[r];
      let inputRow = [];
      for (var i = 0; i < row.length; i ++) {
          let input = row[i];

          inputRow.push(
              <InputButton value={input} 
                           highlight={this.state.operator === input}
                           onClick={this.onInputButtonPressed.bind(this, input)}
                           key={r + "-" + i}/>
          );
      }

      views.push(<div className="inputRow" key={"row-" + r}>{inputRow}</div>)
    }
    return views;
  }

  onInputButtonPressed = (input) => {
    if (typeof input === 'number') {
      return this.handleInputNumber(input)
    }
    if (typeof input === 'string') {
      return this.handleInputString(input)
    }
  }

  handleInputNumber = (num) => {
    let inputValue = (this.state.inputValue * 10) + num;
    this.setState({
      inputValue: inputValue
    })
  }

  handleInputString = (string) => {
    if (string === '/' || string === '*' || string === '+' || string === '-') {
      this.setState({
        operator: string,
        previousInputValue: this.state.inputValue,
        inputValue: 0
      })
    }
    if (string === '=') {
      let symbol = this.state.operator,
          inputValue = this.state.inputValue,
          previousInputValue = this.state.previousInputValue;
      this.setState({
        previousInputValue: 0,
        inputValue: eval(previousInputValue + symbol + inputValue),
        operator: null
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="screen">
          <div className="displayText">{this.state.inputValue}</div>
        </div>
        <div className="buttons-section">
          {this.renderInputButtons()}
        </div>
      </div>
    );
  }
}

export default App;
