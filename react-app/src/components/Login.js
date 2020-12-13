import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Login = () => {
  return (
    <div style={{ color: "white" }}>
      <Card border="light" style={{ backgroundColor: "transparent" }}>
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-Posta Adresi</Form.Label>
              <Form.Control type="email" placeholder="" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Parola</Form.Label>
              <Form.Control type="password" placeholder="" />
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
};

export default Login;
