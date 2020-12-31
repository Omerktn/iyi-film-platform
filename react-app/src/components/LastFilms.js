import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import "./site.css";


const LastFilms = ({ last_films }) => {
  return (
    <div style={{ color: "white" }}>
      <div style={{display: "block"}}>
        <h4 style={{ textAlign: "center"}}>Güncel Film ve Diziler 
        <Badge variant="primary" style={{display: "inline", margin: "10px", float: "10px" }}>Trend</Badge>{' '}</h4>
      </div>

      {last_films.map((film) => (
        <div key={film.id} style={{ margin: "10px",float: "right"  }}>

          <Card style={{backgroundColor:"#282828", width: "17rem", height: "35rem", margin: "35px"}}>
            
              
              <Row className="row-md-3" style={{display: "block"}}>
              <div ><Card.Img class="filmPoster" src = {film.image_file} style={{width: "17rem", height: "25rem",
              boxShadow: "2px 2px 2px darkslategray", borderBottom: "solid steelblue 7px", borderRight: "solid steelblue 7px", borderRadius:"4px" }} />
              </div>
              </Row>

              <Row style={{display: "block" }}>

                <Card.Body>
                  <a  href={"/film/" + film.id}>
                  <Card.Title style={{ color: "white", fontWeight: "bold", fontSize: "1.4rem"}}> {film.name} </Card.Title>
                  </a>
                  <Card.Text style={{}}> {setType(film.filmtype)} </Card.Text>
                  
                  <div style={{ float:"right" }}>
                  <Card.Text style={{display: "inline", fontWeight: "bold", fontSize: "1.4rem", textAlign: "right" }}>
                    <Badge style={{ color: "#FFFFFF", backgroundColor: setBorderColor((film.vote_sum / film.vote_count).toFixed(1)) }}>
                      {(film.vote_sum / film.vote_count).toFixed(1)}
                    </Badge>{' '}
                  </Card.Text>
                    <a href={"/film/" + film.id}><img src="baseline_mode_comment_white_24dp.png"/></a>
                    
                  </div>

                </Card.Body>

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
  if (tip === "Movie"){
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