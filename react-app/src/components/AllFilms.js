import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'

//import Pagination from "react-js-pagination";
//require("bootstrap/less/bootstrap.less");

class AllFilms extends Component {
  state = {
    films: [],
    pageNumbers: [],
    currentPage: 1,
    itemPerPage: 10,
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
    const indexOfLastFilm = this.state.currentPage * this.state.itemPerPage;
    const indexOfFirstFilm = indexOfLastFilm - this.state.itemPerPage;
    const currentFilms = this.state.films.slice(indexOfFirstFilm, indexOfLastFilm);

    const pageNumbers = [];

    

    for (let number = 1; number <= Math.ceil(this.state.films.length/this.state.itemPerPage); number++) {
      pageNumbers.push(
        <Pagination.Item onClick= {() => this.setState({currentPage: number})} key={number} active={number === this.statecurrentPage}>
          {number}
        </Pagination.Item>,
      );
    }

    return (
      <div style={{ color: "white" }}>
        <div>
          <h4 style={{ display: "inline-block" }}>Tüm Film ve Diziler</h4>
          <Badge variant="primary" style={{ margin: "10px", float: "10px" }}>
            Trend
          </Badge>{" "}
        </div>


        <Pagination size="sm" style={{backgorundColor: "steelblue"}}>
          <Pagination.First />
          <Pagination.Prev />
          {pageNumbers}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>

       
        {currentFilms.map((film) => (
          <div key={film.id} style={{ margin: "10px" }}>
            <Card
              style={{
                backgroundColor: "#282828",
                width: "50rem",
                padding: "10px",
              }}
            >
              <Row>
                <Col
                  className="col-md-3"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card.Img
                    src={film.image_file}
                    style={{
                      width: "10rem",
                      height: "15rem",
                      boxShadow: "2px 2px 2px darkslategray",
                      borderBottom: "solid steelblue 7px",
                      borderRight: "solid steelblue 7px",
                      borderRadius: "4px",
                      margin: "10px",
                    }}
                  />
                </Col>

                <Col style={{ display: "flex", justifyContent: "left" }}>
                  <Card.Body>
                    <Card.Title
                      style={{
                        color: "white",
                        display: "inline-block",
                        fontWeight: "bold",
                        fontSize: "1.4rem",
                      }}
                    >
                      {" "}
                      {film.name}{" "}
                    </Card.Title>
                    <Card.Text
                      style={{
                        display: "inline-block",
                        float: "right",
                        fontWeight: "bold",
                        fontSize: "1.4rem",
                      }}
                    >
                      <Badge
                        style={{
                          color: "#FFFFFF",
                          backgroundColor: setBorderColor(
                            (film.vote_sum / film.vote_count).toFixed(1)
                          ),
                        }}
                      >
                        {(film.vote_sum / film.vote_count).toFixed(1)}
                      </Badge>{" "}
                    </Card.Text>

                    <Card.Text> {setType(film.filmtype)} </Card.Text>
                    <div style={{ display: "flex" }}>
                      <Button
                        variant="primary"
                        style={{
                          right: "1rem",
                          position: "absolute",
                          bottom: "0",
                        }}
                        className="btn btn-light"
                      >
                        Değerlendirmeler
                      </Button>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </div> 
        ))}
      </div>
    );
  }
}

function setBorderColor(rating) {
  if (rating > 4) {
    return "SeaGreen";
  } else if (rating > 3) {
    return "LimeGreen";
  } else if (rating > 2) {
    return "Gold";
  } else if (rating > 1) {
    return "DarkOrange";
  } else {
    return "FireBrick";
  }
}

function setType(tip) {
  if (tip === "Movie") {
    return "Film";
  } else {
    return "Dizi";
  }
}

export default AllFilms;
