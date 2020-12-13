// Burada tek filme ait bilgiler ve değerlendirme ekleme formu olacak.

import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

class OneFilm extends Component {
  constructor(props) {
    super(props);
    this.state = { film: {} };
  }

  componentDidMount() {
    fetch("../film/?id=" + this.props.id)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ film: data });
        console.log(data);
      })
      .catch(console.log);
  }

  render() {
    var film = this.state.film;
    return (
      <div>
        <h1>Hello, Film: {film.name}</h1>

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
    );
  }
}

function setBorderColor(rating){
    if (rating > 4){
      return "SeaGreen";
    } else if (rating > 3){
        return "LimeGreen";
    } else if (rating > 2){
        return "Gold";
    } else if (rating>1) {
        return "DarkOrange";
    } else {
      return "FireBrick";
    }
  }
  
  function setType(tip){
    if (tip === "Movie"){
      return "Film";
    } else {
      return "Dizi";
    }
  }

export default OneFilm;
