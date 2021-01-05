import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import "./site.css";

class SearchPage extends Component {
  constructor() {
    super();
    this.state = { query: "", films: [] };
  }

  componentDidMount() {
    fetch("/searchfilm/?query=" + this.props.query)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ films: data });
        console.log(data);
      })
      .catch(console.log);
  }

  render() {
    var filmler = this.state.films;
    return (
      <div style={{ color: "white" }}>
        <div style={{ display: "block" }}>
          <h4 style={{ textAlign: "center" }}>
            <Badge
              variant="primary"
              style={{ display: "inline", margin: "10px", float: "10px", paddinmg: '20px' }}
            >
              Arama sonuçları
            </Badge>{" "}
            {filmler.map((film) => (
              <div key={film.id} style={{padding: "15px"}}>
                <Card
                  style={{
                    backgroundColor: "#282828",
                    width: "50rem",
                    padding: "20px",
                  }}
                >
                  <Row>
                    <Col
                      className="col-md-3"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Card.Img variant="left" src={film.image_file} />
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
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </div>
            ))}
          </h4>
        </div>
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

export default SearchPage;
