
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

import flask_praetorian
import flask_cors

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dcde5facb64a33a357764bbfb79464cc3'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///site.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}

db = SQLAlchemy(app)
guard = flask_praetorian.Praetorian()
cors = flask_cors.CORS()
bcrypt = Bcrypt(app)

cors.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

from iyifilm import models
from iyifilm import routes

guard.init_app(app, models.User)
