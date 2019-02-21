import React from 'react';
import './login.css';

class LogInForm extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    let {name, value} = event.target;

    this.setState({
      [name] : value
    })
  }
    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={(event) => {
                   event.preventDefault();
                   this.props.loginUser(this.state);
                }}>
                    <label>Usersname</label>
                    <input type="text" name="username" onChange={this.handleChange} value={this.state.username} id="usernameLogin"/>
                    <label>Password</label>
                    <input type="password" name="password"  onChange={this.handleChange} value={this.state.password} id="passwordLogin"/>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        )
    }
}

export default LogInForm;
