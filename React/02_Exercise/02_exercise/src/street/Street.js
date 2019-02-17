import React, {Component} from 'react';
import './Street.css';

const street = (props) => (
      <div className="Street" onMouseEnter={() => props.streetHoverEvent(props.id)}>
        <p className="street-info"> {props.location}</p>
      </div>
    )

export default street;
