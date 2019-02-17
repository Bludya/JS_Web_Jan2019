import React from 'react';
import './House.css';

const house = (props) => (
    <div className="House" onMouseEnter={()=> props.houseHoverEvent(props.id)}>
      <img src={props.imageUrl}></img>
      </div>
  )

export default house;
