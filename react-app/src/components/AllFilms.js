import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Pagination from 'react-bootstrap/Pagination'

//import Pagination from "react-js-pagination";
//require("bootstrap/less/bootstrap.less");

class AllFilms extends Component {
  state = {
    films: [],
    pageNumbers: [],
    currentPage: 1,
    itemPerPage: 10,
    sortType: 1
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
    var sortType = this.state.sortType;
    this.state.films.sort(function (a,b){
      if((a.vote_sum / a.vote_count).toFixed(1) < (b.vote_sum / b.vote_count).toFixed(1) ){
        if(sortType === 0){
          return -1;
        } else {return 1;}
      }
      if((a.vote_sum / a.vote_count).toFixed(1) > (b.vote_sum / b.vote_count).toFixed(1) ){
        if(sortType === 0){
          return 1;
        }
        else{return -1;}
      }
      return 0;
    });
    const currentFilms = this.state.films.slice(indexOfFirstFilm, indexOfLastFilm);

    const pageNumbers = [];

    for (let number = 1; number <= Math.ceil(this.state.films.length/this.state.itemPerPage); number++) {
      pageNumbers.push(
        <Pagination.Item onClick= {() => this.setState({currentPage: number})} key={number} active={number === this.state.currentPage}>
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
          <Pagination.First onClick= {() => this.setState({currentPage: 1})} />
          <Pagination.Prev onClick= {() => (this.state.currentPage === 1)?this.setState({currentPage: 1}): this.setState({currentPage: this.state.currentPage-1})} />
          {pageNumbers}
          <Pagination.Next onClick= {() => (this.state.currentPage === Math.ceil(this.state.films.length/this.state.itemPerPage))?this.setState({currentPage: Math.ceil(this.state.films.length/this.state.itemPerPage)}): this.setState({currentPage: this.state.currentPage+1})} />
          <Pagination.Last onClick= {() => this.setState({currentPage: Math.ceil(this.state.films.length/this.state.itemPerPage)})}/>
        </Pagination>

        <Button style={{backgroundColor:"#282828", margin: "5px", border: "steelBlue solid 2px"}} onClick= {() => this.setState({sortType:1})}>Artan</Button>
        <Button style={{backgroundColor:"#282828", margin: "5px", border: "steelBlue solid 2px"}} onClick= {() => this.setState({sortType:0})}>Azalan</Button>

       
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
                  <a href={"/film/" + film.id}>
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
                  </a>
                </Col>

                <Col style={{ display: "flex", justifyContent: "left" }}>
                  <Card.Body>
                    <a href={"/film/" + film.id}>
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
                    </a>
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
