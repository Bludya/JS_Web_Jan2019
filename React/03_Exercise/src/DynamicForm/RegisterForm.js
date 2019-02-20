import React from 'react';
import './register.css';

class RegisterForm extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        username: '',
        email: '',
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
            <div className="Register">
                <h1>Sign Up</h1>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    this.props.registerUser(this.state);
                }}>
                    <label>Username</label>
                    <input type="text" name="username" onChange={this.handleChange} value={this.state.username} id="usernameReg"/>
                    <label>Email</label>
                    <input type="text" name="email" onChange={this.handleChange} value={this.state.email} id="emailReg"/>
                    <label>Password</label>
                    <input type="password" name="password"  onChange={this.handleChange} value={this.state.password} id="passwordReg"/>
                    <input type="submit" value="Sign Up"/>
                </form>
            </div>
        )
    }
}
export default RegisterForm;
