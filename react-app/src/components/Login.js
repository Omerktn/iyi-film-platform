import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Redirect } from "react-router-dom";

import {useAuth, login} from "../auth"

function hookWrapper(Component) {
  return function WrappedComponent(props) {
    const [logged] = useAuth();
    if (logged) {
      return <Redirect to="/" />
    }
    else {
      return <Component {...props} isLogged={logged} />;
    }
    
  };
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  emailHandleChange = (event) => {
    this.setState({ email: event.target.value });
  };

  passwordHandleChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    console.log("A form was submitted: " + JSON.stringify(this.state));

    fetch("/api/login", {
      method: "POST",
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(this.state),
    })
      .then((r) => r.json())
      .then(token => {
        if (token.access_token){
          login(token)
          console.log(token)          
        }
        else {
          console.log("Please type in correct username/password")
        }
      })

    event.preventDefault();
  };

  render() {
    return (
      <div style={{}}>
        <Card
          style={{
            backgroundColor: "#282828",
            boxShadow: "2px 2px 2px darkslategray",
            borderBottom: "solid steelblue 7px",
            borderRight: "solid steelblue 7px",
            borderRadius: "4px",
          }}
        >
          <Card.Body>
            <Form
              style={{ color: "white", fontweight: "bold" }}
              onSubmit={this.handleSubmit}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>E-Posta Adresi</Form.Label>
                <Form.Control
                  type="email"
                  placeholder=""
                  value={this.state.email}
                  onChange={this.emailHandleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Parola</Form.Label>
                <Form.Control
                  type="password"
                  placeholder=""
                  value={this.state.password}
                  onChange={this.passwordHandleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Beni Hatırla" />
              </Form.Group>

              <Button variant="light" type="submit">
                Giriş Yap
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default hookWrapper(Login);
