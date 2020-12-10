import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "react-bootstrap/Nav";

const LastFilms = ({ last_films }) => {
    return (
        <div style={{ color: "white" }}>

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#">İyi Film</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Anasayfa <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Film-Dizi Değerlendirmeleri</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Kayıt Ol</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#">Giriş Yap</a>
                        </li>
                    </ul>
                </div>
            </nav>

        </div >
    )
};


export default LastFilms