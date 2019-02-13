import React, { Component } from 'react';

class Details extends Component {
  render() {
    let person = this.props.person;
    return (
      <fragment>
        <h1>Details</h1>
        <div class="content">
            <div class="info">
                <div class="col">
                    <span class="avatar">&#9787;</span>
                </div>
                <div class="col">
                    <span class="name">{person.firstName}</span>
                    <span class="name">{person.lastName}</span>
                </div>
            </div>
            <div class="info">
                <span class="info-line">&#9742; {person.phone}</span>
                <span class="info-line">&#9993; {person.email}</span>
            </div>
        </div>
      </fragment>
    )
  }
}

export default Details;
