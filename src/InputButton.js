import React, { Component } from 'react';
import './App.css';

export class InputButton extends Component {
  render() {
    return (
      <div className="inputButton" onClick={this.props.onClick}>
        <div className="inputButtonText">{this.props.value}</div>
      </div>
    );
  }
}

export default InputButton;
