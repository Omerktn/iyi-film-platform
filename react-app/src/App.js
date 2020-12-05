import React, {Component} from 'react';
import './App.css';
import LastMovies from './components/last_movies';

class App extends Component {
  state = {
    films: []
  }

  componentDidMount() {
    fetch('film/all')
    .then(res => res.json())
    .then((data) => {
      this.setState({ films: data })
      console.log(data);
    })
    .catch(console.log)
  }

  render () {
    return (
      <LastMovies last_movies={this.state.films} />
    );
 }
};

export default App;
