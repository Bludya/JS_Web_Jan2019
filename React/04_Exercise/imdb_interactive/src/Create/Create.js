import React, { Component } from 'react';
import './Create.css';

class Create extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      storyLine: '',
      trailerUrl: '',
      poster: ''
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
      <div className="Create">
        <form onSubmit={(event) => this.props.handleSubmit(event, this.state, '/feed/movie/create')}>
          <label for="title">Title</label>
          <input type="text" id="title" value={this.state.title} onChange={this.handleChange} name="title" placeholder="Titanic"/>
          <label for="storyLine">Story Line</label>
          <input type="text" id="storyLine" value={this.state.storyLine} onChange={this.handleChange} name="storyLine" placeholder="Text"/>
          <label for="trailerUrl">Trailer Url</label>
          <input type="text" id="trailerUrl" value={this.state.trailerUrl} onChange={this.handleChange} name="trailerUrl" placeholder="https://www.youtube.com/watch?v=DNyKDI9pn0Q"/>
          <label for="poster">Movie Poster</label>
          <input type="text" id="poster" value={this.state.poster} onChange={this.handleChange} name="poster" placeholder="https://encrypted-tbn01zuyi0YDNgCUw4Ky5SNATZDVKaIUkiAA"/>
          <input type="submit" value="Create"/>
        </form>
      </div>
    );
  }
}

export default Create;
