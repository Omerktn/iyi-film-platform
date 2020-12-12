import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import './component.css';

const LastFilms = ({ last_films }) => {
  return (
    <div style={{ color: "white" }}>
      <div>
        <h4 style={{ display: "inline-block" }}>Güncel Film ve Diziler</h4>
        <Badge variant="primary" style={{ margin: "10px", float: "10px" }}>Trend</Badge>{' '}
      </div>

      {last_films.map((film) => (
        <div key={film.id} style={{ margin: "10px" }}>

          <Card style={{ backgroundColor: "#282828", width: "50rem", padding: "10px" }}>
            <Row>

              <Col className="col-md-3" style={{ display: 'flex', justifyContent: 'center' }}>
                <Card.Img variant="left" src = {film.image_file} />
              </Col>

              <Col style={{ display: 'flex', justifyContent: 'left' }}>

                <Card.Body>
                  <Card.Title style={{ color: "white", display: "inline-block", fontWeight: "bold", fontSize: "1.4rem" }}> {film.name} </Card.Title>
                  <Card.Text style={{ display: "inline-block", float: "right", fontWeight: "bold", fontSize: "1.4rem" }}>
                    <Badge variant="danger" style={{ color: "#FFFFFF", backgroundColor: setBorderColor((film.vote_sum / film.vote_count).toFixed(1)) }}>
                      {(film.vote_sum / film.vote_count).toFixed(1)}
                    </Badge>{' '}
                  </Card.Text>

                  <Card.Text > {setType(film.filmtype)} </Card.Text>
                  <div style={{ display: "flex" }}>
                    <Button variant="primary" style={{ right: "1rem", position: "absolute", bottom: "0" }} className="btn btn-light">Değerlendirmeler</Button>
                  </div>

                </Card.Body>

              </Col>
            </Row>
          </Card>

        </div>
      ))
      }
    </div >
  )
};

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
  if (tip == "Movie"){
    return "Film";
  } else {
    return "Dizi";
  }
}

/*
<Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="../../placeholder_poster.png" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
*/

export default LastFilms