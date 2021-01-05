// Burada tek filme ait bilgiler ve değerlendirme ekleme formu olacak.

import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import "./site.css";

import { useAuth, authFetch } from "../auth";

function hookWrapper(Component) {
  return function WrappedComponent(props) {
    const [logged] = useAuth();
    return <Component {...props} isLogged={logged} />;
  };
}

// Değerlendirmenin yazıldığı form
class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ["gray", "gray", "gray", "gray", "gray"],
      review: "",
      score: 0,
    };
  }

  changeColor1 = (e) => {
    //votesum ise 5 artar
    this.setState({
      color: ["limegreen", "limegreen", "limegreen", "limegreen", "limegreen"],
      score: 5,
    });
  };

  changeColor2 = (e) => {
    //votesum ise 4 artar
    this.setState({
      color: ["gray", "limegreen", "limegreen", "limegreen", "limegreen"],
      score: 4,
    });
  };
  changeColor3 = (e) => {
    //votesum ise 3 artar
    this.setState({
      color: ["gray", "gray", "gold", "gold", "gold"],
      score: 3,
    });
  };
  changeColor4 = (e) => {
    //votesum ise 2 artar
    this.setState({
      color: ["gray", "gray", "gray", "darkorange", "darkorange"],
      score: 2,
    });
  };
  changeColor5 = (e) => {
    //burada veritabanında bu filmin vote-countu 1 artar
    //votesum ise 1 artar
    this.setState({
      color: ["gray", "gray", "gray", "gray", "fireBrick"],
      score: 1,
    });
  };

  handleSubmit = (event) => {
    const sendingjson = JSON.stringify({
      review: this.state.review,
      score: this.state.score,
      film_id: this.props.filmId
    });
    console.log("A form was submitted: " + sendingjson);

    authFetch("/addreview", {
      method: "POST",
      // We convert the React state to JSON and send it as the POST body
      body: sendingjson,
    }).then(function (response) {
      console.log(response);
      return response.json();
    });

    event.preventDefault();
  };

  reviewHandleChange = (event) => {
    this.setState({ review: event.target.value });
  };

  render() {
    return (
      <div className="form-group">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              rows={3}
              type="text"
              as="textarea"
              placeholder="Bu eser için değerlendime yazın"
              value={this.state.review}
              onChange={this.reviewHandleChange}
              style={{
                backgroundColor: "#282828",
                border: "none",
                boxShadow: "2px 2px 2px darkslategray",
                borderLeft: "solid steelblue 4px",
                borderRight: "solid steelblue 4px",
                borderRadius: "4px",
                color: "whitesmoke",
                width: "45rem",
              }}
            />
          </Form.Group>

          <Button
            as="input"
            type="submit"
            value="Gönder"
            style={{
              backgroundColor: "steelblue",
              boxShadow: "2px 2px 5px gray",
              borderRadius: "7px",
              margin: "5px",
              color: "white",
              border: "none",
            }}
          />
        </Form>

        <button className="yildiz" onClick={this.changeColor1}>
          <i style={{ color: this.state.color[0] }} className="material-icons">
            grade
          </i>
        </button>
        <button className="yildiz" onClick={this.changeColor2}>
          <i style={{ color: this.state.color[1] }} className="material-icons">
            grade
          </i>
        </button>
        <button className="yildiz" onClick={this.changeColor3}>
          <i style={{ color: this.state.color[2] }} className="material-icons">
            grade
          </i>
        </button>
        <button className="yildiz" onClick={this.changeColor4}>
          <i style={{ color: this.state.color[3] }} className="material-icons">
            grade
          </i>
        </button>
        <button className="yildiz" onClick={this.changeColor5}>
          <i style={{ color: this.state.color[4] }} className="material-icons">
            grade
          </i>
        </button>
      </div>
    );
  }
}

function WriteReview({ isUserLogged, filmdID }) {
  if (isUserLogged) {
    return <ReviewForm filmId={filmdID} />;
  } else {
    return (
      <Alert variant="warning">
        Değerlendirme yapmak için giriş yapmalısınız.
      </Alert>
    );
  }
}

class OneFilm extends Component {
  constructor(props) {
    super(props);
    this.state = { film: {}, yorumlar: [] };
  }

  componentDidMount() {
    fetch("../film/?id=" + this.props.id)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ film: data });
        console.log(data);
      })
      .catch(console.log);

      //veritabanından review çekiyor

      fetch("../review/?film_id=" + this.props.id)
      .then((res) => res.json())
      .then((data) => {
        console.log("burada yorumlar olmalı: " + data);
        this.setState({ yorumlar: data });
      })
      .catch(console.log);
  }

  render() {
    var film = this.state.film;
    var yorumlar=this.state.yorumlar;
    return (
      <div>
        <h1>{film.name}</h1>

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
                    src={"/" + film.image_file}
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
              </Card.Body>
            </Col>
          </Row>
        </Card>
           {         
           //yeni eklediğim yer aşağıdaki div
           }

        <div>
         
         {yorumlar.map((x, i) => <Card style={{borderLeft:"double steelblue 9px", backgroundColor:"#282828", marginTop: "15px", padding: "10px"}} key={i}>

           <Card.Body>
             <Card.Text style={{fontSize:"24px"}}>{x.text} <Badge style={{float: "right", backgroundColor: "gray", opacity: 0.7}}>{x.rate}</Badge></Card.Text>
           </Card.Body>

           <Card.Footer>
             <Card.Text style={{textAlign: "right", fontStyle: "italic"}} >{x.user_id}</Card.Text>
           </Card.Footer>

           </Card> )}
       
         
       </div>

        <Card
          style={{
            backgroundColor: "#282828",
            padding: "10px",
          }}
        >
          <Row className="d-flex justify-content-lg-center">
            <WriteReview isUserLogged={this.props.isLogged} filmdID={this.props.id}/>
          </Row>
        </Card>
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

export default hookWrapper(OneFilm);
