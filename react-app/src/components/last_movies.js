import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

    const LastMovies = ({ last_movies }) => {
      return (
        <div>
          <center><h1>Film Listesi</h1></center>
          {last_movies.map((film) => (
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{film.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{film.filmtype}</h6>
                <p class="card-text">{film.year}</p>
              </div>
            </div>
          ))}
        </div>
      )
    };

    export default LastMovies