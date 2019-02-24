import React from 'react';

let Movie = (props) =>{
  return(
    <li className="movie">
      <h2>{props.movie.title}</h2>
      <img alt="Not found" src={props.movie.poster}/>
      <span>
        <button onClick={() => props.selectView('trailer', props.movie)}>View Trailer</button>
        <button onClick={() => props.selectView('storiline', props.movie)}>View Story Line</button>
        </span>
    </li>

  )
}

export default Movie;
