import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { withRouter } from 'react-router';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", surname: "", email:"", password:"" };
  }

  
  nameHandleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  surnameHandleChange = (event) => {
    this.setState({ surname: event.target.value });
  };

  passwordHandleChange = (event) => {
    this.setState({ password: event.target.value });
  };

  emailHandleChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleSubmit = (event) => {
    console.log("A form was submitted: " + JSON.stringify(this.state))
      
    fetch("/registersystem", {
      method: "POST",
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(this.state),
    }).then(function (response) {
      console.log(response);
      return response.json();
    });

    event.preventDefault();

    this.props.history.push('/');
  };


  render() {
    return (
      <div style={{ color: "white" }}>
        <Card
          style={{
            backgroundColor: "#282828",
            boxShadow: "2px 2px 2px darkslategray",
            borderBottom: "solid steelblue 7px",
            borderRight: "solid steelblue 7px",
            borderRadius: "4px",
          }}
        >
          <Card.Body style={{ fontWeight: "bold" }}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formFirstLastName">
                <Row>
                  <Col>
                    <Form.Label>Ad</Form.Label>
                    <Form.Control type="text" placeholder="Mehmet" value={this.state.name} onChange={this.nameHandleChange} />
                  </Col>
                  <Col>
                    <Form.Label>Soyad</Form.Label>
                    <Form.Control type="text" placeholder="Yılmaz" value={this.state.surname} onChange={this.surnameHandleChange} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>E-Posta Adresi</Form.Label>
                <Form.Control type="email" placeholder="isim@ornek.com" value={this.state.email} onChange={this.emailHandleChange} />
                <Form.Text style={{ fontWeight: "bold", color: "black" }}>
                  E-Posta adresinizi kimseyle paylaşmayacağız.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Parola</Form.Label>
                <Form.Control type="password" placeholder="Parola" value={this.state.password} onChange={this.passwordHandleChange} />
              </Form.Group>

              <Form.Group>
                <Form.File
                  id="exampleFormControlFile1"
                  label="Profil fotoğrafı"
                />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Kullanıcı sözleşmesini okudum ve onaylıyorum."
                />
              </Form.Group>

              <Button variant="light" type="submit">
                Kayıt Ol
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withRouter(Register);
