import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import './Home.css'
import Movie from './Movie';

let Trailer = (props) => {
  return(
    <span>
      <h2>Trailer of {props.movie.title}</h2>
          <ReactPlayer
            url={props.movie.trailerUrl}
            className='trailer'
            playing
            width='640px'
            height='360px' playing controls/>
    </span>
  )
}

let StoryLine = (props) => {
  return (
    <span>
      <h2>Story line of {props.movie.title}</h2>
      <p>{props.movie.storyLine}</p>
    </span>
  )
}

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      story: null,
      trailer: null,
      movies:[]
    };
  }

  selectView = (view, movie) => {
    view === 'trailer' ?
    this.setState({
      story: null,
      trailer: movie
    }) :
    this.setState({
      story: movie,
      trailer: null
    })
  }

  componentDidMount = async () => {
    let movies = await this.props.fetchMovies();
    this.setState({movies})
  };

  render() {
    return (
      <div className="Home">
        <h1>All movies</h1>
          {this.state.story ? <StoryLine movie={this.state.story} /> : ''}
          {this.state.trailer ? <Trailer movie={this.state.trailer} /> : ''}
          <ul className="movies">
            {
              this.state.movies.map(movie => <Movie key={movie._id} movie={movie} selectView={this.selectView}/>)
            }
          </ul>
      </div>
    );
  }
}

export default Home;
