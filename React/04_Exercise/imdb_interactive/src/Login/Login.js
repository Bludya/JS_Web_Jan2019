import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
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
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={(event) => this.props.handleSubmit(event, this.state, '/auth/signin')}>
          <label htmlFor="usernameLogin">Username</label>
          <input type="text" id="usernameLogin" value={this.state.username} onChange={this.handleChange} name="username" placeholder="Ivan Ivanov"/>
          <label htmlFor="passwordLogin">Password</label>
          <input type="password" id="passwordLogin" value={this.state.password} onChange={this.handleChange} name="password" placeholder="******"/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    );
  }
}

export default Login;
