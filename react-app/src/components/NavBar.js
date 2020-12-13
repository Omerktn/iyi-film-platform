import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

const NavigationBar = () => {
  return (
    <div style={{ color: "white" }}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">İYİ FİLM</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Anasayfa</Nav.Link>
          <Nav.Link href="/allfilms">Tüm Değerlendirmeler</Nav.Link>
        </Nav>
        <Nav className="mr-right">
          <Nav.Link href="/register">Kayıt Ol</Nav.Link>
          <Nav.Link href="/login">Giriş Yap</Nav.Link>
        </Nav>

        <Form inline>
          <FormControl
            type="text"
            placeholder="Film veya dizi"
            className="mr-sm-2"
          />
          <Button variant="outline-info">Ara</Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
