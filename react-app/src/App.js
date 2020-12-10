import React, { Component } from 'react';
import './App.css';
import LastFilms from './components/LastFilms';
import NavBar from './components/NavBar';

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

  render() {
    return (
      <div>
        <NavBar />

        <div style={{ backgroundColor: "#121212", display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <LastFilms last_films={this.state.films} />
        </div>
      </div>
    );
  }
};

export default App;
