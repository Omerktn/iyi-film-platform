// Burada tek filme ait bilgiler ve değerlendirme ekleme formu olacak.

import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import "./site.css";

class OneFilm extends Component {
  constructor(props) {
    super(props);
    this.state = { film: {} , color: ["gray","gray","gray","gray","gray"]};
  }

  changeColor1 = (e) => {
    //burada veritabanında bu filmin vote-countu 1 artar
    //votesum ise 5 artar
    this.setState({
      color: ["seagreen","seagreen","seagreen","seagreen","seagreen"]
    })
  }

  changeColor2 = (e) => {
    //burada veritabanında bu filmin vote-countu 1 artar
    //votesum ise 4 artar
    this.setState({
      color: ["gray","limegreen","limegreen","limegreen","limegreen"]
    })
  }
  changeColor3 = (e) => {
    //burada veritabanında bu filmin vote-countu 1 artar
    //votesum ise 3 artar
    this.setState({
      color: ["gray","gray","gold","gold","gold"]
    })
  }
  changeColor4 = (e) => {
    //burada veritabanında bu filmin vote-countu 1 artar
    //votesum ise 2 artar
    this.setState({
      color: ["gray","gray","gray","darkorange","darkorange"]
    })
  }
  changeColor5 = (e) => {
    //burada veritabanında bu filmin vote-countu 1 artar
    //votesum ise 1 artar
    this.setState({
      color: ["gray","gray","gray","gray","fireBrick"]
    })
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
        <div class="form-group">
          <label for="yorum" style={{fontSize: "24px"}}>Yorum Yazın</label>
          <textarea class="form-control" id="yorum" rows="3" style={{backgroundColor: "#282828", 
          border: "none", boxShadow: "2px 2px 2px darkslategray", 
          borderLeft: "solid steelblue 4px", borderRight: "solid steelblue 4px", borderRadius:"4px", color:"whitesmoke"}}></textarea>
          <Button as="input" type="submit" value="Gönder" style={{backgroundColor: "steelblue", 
          boxShadow: "2px 2px 5px gray", 
          borderRadius: "7px",margin: "5px", color: "white", border: "none"}}/>
          <button className="yildiz" onClick={this.changeColor1}><i style={{color:this.state.color[0]}} class="material-icons">grade</i></button> 
          <button className="yildiz" onClick={this.changeColor2}><i style={{color:this.state.color[1]}}class="material-icons">grade</i></button> 
          <button className="yildiz" onClick={this.changeColor3}><i style={{color:this.state.color[2]}} class="material-icons">grade</i></button> 
          <button className="yildiz" onClick={this.changeColor4}><i style={{color:this.state.color[3]}} class="material-icons">grade</i></button> 
          <button className="yildiz" onClick={this.changeColor5}><i style={{color:this.state.color[4]}} class="material-icons">grade</i></button> 
         </div>
         

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
