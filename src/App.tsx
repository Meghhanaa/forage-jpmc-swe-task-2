import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';
import { ServerResponse } from 'http';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean, // Added showGraph to the state
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  intervalId: any; // Added to store the interval ID

  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      showGraph: false, // Initialize showGraph as false
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if (this.state.showGraph) { // Only render the Graph if showGraph is true
      return (<Graph data={this.state.data}/>)
    }
    // return null; // Return null if showGraph is false
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    let x = 0
    const interval = setInterval(() => {
      DataStreamer.getData((ServerResponds: ServerRespond[]) => {
        this.setState({
          data: ServerResponds,
          showGraph: true,
        });
      });
      x++;
      if (x > 100) {
        clearInterval(interval);
      } 
    }, 100); // Fetch data every 100ms4
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            onClick={() => {
              this.getDataFromServer();
              this.setState({ showGraph: true }); // Set showGraph to true when button is clicked
            }}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }

  // Clear the interval when the component is about to unmount
  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

export default App;

