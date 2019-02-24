import React, { Component, lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from './Header/Header.js';
import { ToastContainer, toast } from 'react-toastify';

const Home = lazy(() => import('./Home/Home'));
const Register = lazy(() => import('./Register/Register'));
const Login = lazy(() => import('./Login/Login'));
const Create = lazy(() => import('./Create/Create'));

let NotFound = () => (<p>Error 404: Page Not Found</p>);
let Unauthorized = () => (<p>You are not authorized for this page</p>);

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: null,
      isAdmin: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchMovies = async () => {
    let res = await fetch('http://localhost:9999/feed/movies',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json());

    return res.movies;
  }

  handleSubmit = (event, data, path) =>{
    event.preventDefault();
    fetch('http://localhost:9999' + path,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(data => data.json())
    .then((res) => {
      if(res.username){
        this.setState({
          username: res.username,
          isAdmin: res.isAdmin,
        })
        console.log(res.isAdmin);

        toast.success(`Success!`);
      }else if(res.movie) {
        toast.success(`Success!`);
      }else {
        toast.error(res.message);
      }
    })
    .catch((e)=>{
      toast.error(e);
    })
  }

  render() {
    return (
      <div className="App">
        <ToastContainer autoClose={2000} closeButton={false}/>
        <Router>
          <Suspense fallback={<span>Loading...</span>}>
            <Header username={this.state.username}  isAdmin={this.state.isAdmin} />
            <Switch>
              <Route path='/' component={() => <Home fetchMovies={this.fetchMovies}/>} props={this.state.username} exact />
              <Route path='/login'  component={() => <Login handleSubmit={this.handleSubmit} />} exact />
              <Route path='/register' component={() => <Register handleSubmit={this.handleSubmit} />}  exact />
              <Route path='/create' component={() => this.state.isAdmin ? <Create handleSubmit={this.handleSubmit} /> : <Unauthorized />} exact />
              <Route component={() => <NotFound />}/>
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  }
}

export default App;
