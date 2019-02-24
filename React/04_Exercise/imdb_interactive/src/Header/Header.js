import React from 'react';
import {NavLink} from 'react-router-dom';

let Header = (props) =>{
  return (
    <header>
      <NavLink to="#" exact className="logo">Interactive IMDB</NavLink>
      <div className="header-right">
        <NavLink exact to="/">Home</NavLink>
          {props.username ?
            (<span>
              <NavLink exact to="#">Welcome {props.username}!</NavLink>

              {props.isAdmin ?
              (
                <NavLink exact to="/create">Create</NavLink>
              ) : ('')}
              <NavLink exact to="/logout">Logout</NavLink>
            </span>
            ) :
            (
              <span>
                <NavLink exact to="/register">Register</NavLink>
                <NavLink exact to="/login">Login</NavLink>
              </span>
            )
          }
      </div>
    </header>
  )
}

export default Header;
