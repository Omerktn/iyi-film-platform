import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const Register = () => {
  return (
    <div style={{ color: "white" }}>
      <Card border="light" style={{ backgroundColor: "transparent" }}>
        <Card.Body>
          <Form>
            <Form.Group controlId="formFirstLastName">
              <Row>
                <Col>
                  <Form.Label>Ad</Form.Label>
                  <Form.Control type="text" placeholder="Mehmet" />
                </Col>
                <Col>
                  <Form.Label>Soyad</Form.Label>
                  <Form.Control type="text" placeholder="Yılmaz" />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-Posta Adresi</Form.Label>
              <Form.Control type="email" placeholder="isim@ornek.com" />
              <Form.Text className="text-muted">
                E-Posta adresinizi kimseyle paylaşmayacağız.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Parola</Form.Label>
              <Form.Control type="password" placeholder="Parola" />
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
};

export default Register;
