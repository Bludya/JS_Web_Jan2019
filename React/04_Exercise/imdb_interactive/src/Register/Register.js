import React, { Component } from 'react';
import './Register.css';

class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="Register">
          <h1>Register</h1>
          <form onSubmit={(event) => this.props.handleSubmit(event, this.state, '/auth/register')}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={this.state.username} name="username" onChange={this.handleChange} placeholder="Ivan Ivanov" />
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="ivan@gmail.com" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="******" />
            <input type="submit" value="REGISTER" />
          </form>
      </div>
    );
  }
}

export default Register;
