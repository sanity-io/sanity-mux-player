import React, {Component} from 'react'
import Video from './Video'
import './App.css'

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="videoContainer">
            <Video />
          </div>
        </header>
      </div>
    )
  }
}

export default App
