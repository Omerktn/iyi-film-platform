import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

import { useAuth, logout } from "../auth";


function LogButtons({ isLogged }) {
  if (isLogged) {
    return (
      <div>
        <Nav.Link onClick={() => logout()} style={{ margin: "5px" }}>
          Çıkış Yap
        </Nav.Link>
      </div>
    );
  } else {
    return (
      <Nav className="mr-right">
        <Nav.Link href="/register" style={{ margin: "5px" }}>
          Kayıt Ol
        </Nav.Link>
        <Nav.Link
          href="/login"
          style={{
            backgroundColor: "steelblue",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: "7px",
            margin: "5px",
            color: "white",
          }}
        >
          Giriş Yap
        </Nav.Link>
        </Nav>
    );
  }
}

function hookWrapper(Component) {
  return function WrappedComponent(props) {
    const [logged] = useAuth();
    return <Component {...props} isLogged={logged} />;
  };
}

class NavigationBar extends React.Component {
  render() {
    const isLogged = this.props.isLogged;
    console.log(isLogged);
    return (
      <div style={{ color: "white" }}>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand
            href="/"
            style={{
              fontFamily: "monospace",
              fontSize: "24px",
              color: "steelblue",
            }}
          >
            İYİ FİLM
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Anasayfa</Nav.Link>
            <Nav.Link href="/allfilms">Tüm Değerlendirmeler </Nav.Link>
          </Nav>
          <LogButtons isLogged={isLogged}/>

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
  }
}


//export default NavigationBar;
export default hookWrapper(NavigationBar);
