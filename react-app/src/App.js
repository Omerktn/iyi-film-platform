import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, useParams} from "react-router-dom";
import "./App.css";

import LastFilms from "./components/LastFilms";
import AllFilms from "./components/AllFilms";
import OneFilm from "./components/OneFilm";
import Register from "./components/Register";
import Login from "./components/Login";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    films: [],
  };

  componentDidMount() {
    fetch("film/all")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ films: data });
        console.log(data);
      })
      .catch(console.log);
  }

  render() {
    return (
      <Router>
        <NavBar />

        <div
          style={{
            backgroundColor: "#121212",
          }}
        >
          <Switch>
            <Route path="/register">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <Register />
              </div>
            </Route>

            <Route path="/login">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <Login />
              </div>
            </Route>

            <Route path="/allfilms">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <AllFilms all_films={this.state.films} />
              </div>
            </Route>

            <Route path="/film/:filmId">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                  color: "white"
                }}
              >
                <GetOneFilm /> 
              </div>
            </Route>


            <Route path="/">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <LastFilms last_films={this.state.films} />
              </div>
            </Route>
          </Switch>
        </div>

        <Footer />
      </Router>
    );
  }
}

function GetOneFilm() {
  let { filmId } = useParams();
  return <OneFilm id={filmId} />
}

export default App;
