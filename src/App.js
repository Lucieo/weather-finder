import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherApp from './components/WeatherApp'

class App extends Component {
  render() {
    return (
      <div className="App">
      <WeatherApp/>
      </div>
    );
  }
}

export default App;
