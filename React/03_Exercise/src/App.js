import React, {Component} from 'react';
import './App.css';
import AppHeader from "./App/AppHeader";
import AppContent from "./App/AppContent";
import AppFooter from "./App/AppFooter";

const server = 'http://localhost:9999/';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            games: [],
            hasFetched: false,
            loginForm: false,
        }
    }

    getGamesData(){
      fetch(server + 'feed/games')
        .then(data => data.json())
        .then(data => {
          this.setState({games: data.games});
        })
    }

    registerUser(user) {
      fetch(server + 'auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(user)
      })
      .then(response =>response.json())
      .then((body) => {
        this.loginUser(user);
      })
      .catch((error) => console.log(error));
    }

    loginUser(user) {
      fetch(server + 'auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(user)
      })
      .then(response =>response.json())
      .then((data) => {
        window.sessionStorage.setItem('token', data.token);
        window.sessionStorage.setItem('username', data.username);
        this.setState({user: data.username});
      })
      .catch((error) => console.log(error.json()))
    }

    logout(event) {
      event.preventDefault();
      window.sessionStorage.clear();
      this.setState({user: null});
    }

    componentWillMount() {
      if(window.sessionStorage.getItem('token')){
        this.setState({user: window.sessionStorage.getItem('username')});
      }else {
        this.setState({user: null});
      }

      this.getGamesData();
    }

    createGame(game) {
      fetch(server + 'feed/game/create', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(game)
      })
      .then(res => res.json())
      .then(res => {
        this.getGamesData();
      })
      .catch(e => {
        console.error(e);
      })

    }

    switchForm() {
        this.setState({
          loginForm : !this.state.loginForm
        });
    }

    render() {
        return (
            <main>
                <AppHeader
                    user={this.state.user}
                    logout={this.logout.bind(this)}
                    switchForm={this.switchForm.bind(this)}
                    loginForm={this.state.loginForm}
                />
                <AppContent
                    registerUser={this.registerUser.bind(this)}
                    loginUser={this.loginUser.bind(this)}
                    games={this.state.games}
                    createGame={this.createGame.bind(this)}
                    user={this.state.user}
                    loginForm={this.state.loginForm}
                />
                <AppFooter/>
            </main>
        )
    }
}

export default App;
