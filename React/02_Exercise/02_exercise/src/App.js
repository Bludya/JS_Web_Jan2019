import React, { Component } from 'react';
import './App.css';

import Street from './street/Street';
import House from './house/House';
import HouseDetails from './houseDetails/HouseDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streets: [],
      selectedStreetIdx: 0,
      selectedHouseIdx: 0,
      hasFetched: false
    }
  }

  componentWillMount() {
    fetch('http://localhost:9999/feed/street/all')
      .then(response => response.json())
      .then(data => {
        this.setState({
          streets: data.streets,
          hasFetched: true
        })
      })
  }

  getSelectedStreet(){
    return this.state.streets[this.state.selectedStreetIdx].homes;
  }

  getSelectedHouse(){
    return this.state.streets[this.state.selectedStreetIdx].homes[this.state.selectedHouseIdx];
  }

  streetHoverEvent(idx){
    this.setState({
      selectedStreetIdx: idx
    })
  }

  houseHoverEvent(idx){
    this.setState({
      selectedHouseIdx: idx
    })
  }

  render() {
    if(!this.state.hasFetched){
      return null;
    }

    return (
      <div className="App">
        <div className="streets">
          <h2>Streets</h2>
          {
            this.state.streets.length > 0 ?
              this.state.streets.map((street, idx) => {
                return (
                  <Street location={street.location} key={idx} id={idx} streetHoverEvent={this.streetHoverEvent.bind(this)}/>
                )
              }) : null
          }
        </div>
        <div className="houses">
          <h2>Houses</h2>
          {
            this.getSelectedStreet().map((home, idx) => (
              <House type={home.type} description={home.description} id={idx} imageUrl={home.imageUrl} price={home.price} key={idx} houseHoverEvent={this.houseHoverEvent.bind(this)}/>
            ))
          }
        </div>
        <div className="house-details">
          {
            this.state.streets.length > 0 ?
              <HouseDetails
                type={this.getSelectedHouse().type}
                description={this.getSelectedHouse().description}
                imageUrl={this.getSelectedHouse().imageUrl}
                price={this.getSelectedHouse().price}
                key={this.selectedHouseIdx} />
              : null
          }
        </div>
      </div>
    );
  }
}

export default App;
