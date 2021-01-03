# Veritabanınıdaki tablo modellerinin tanımlandığı
# dosya.

from iyifilm import db, login_manager
from flask_login import UserMixin
from sqlalchemy.inspection import inspect


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class Serializer(object):
    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}
    @staticmethod
    def serialize_list(lst):
        return [m.serialize() for m in lst]

class Film(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)
    filmtype = db.Column(db.String, default="Movie") # veya "Series"
    season = db.Column(db.Integer, nullable=True)
    year = db.Column(db.Integer, default=1970)
    image_file = db.Column(db.String(50), nullable=False,
                           default='default.jpg')
    vote_count = db.Column(db.Integer, default=0)
    vote_sum = db.Column(db.Integer, default=0)

    def serialize(self):
        d = Serializer.serialize(self)
        return d

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    film_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    text = db.Column(db.String(500), nullable=True, default="")
    rate = db.Column(db.Integer, nullable=False, default=5) # 1-5 arasında

    def serialize(self):
        d = Serializer.serialize(self)
        return d

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), unique=True, nullable=False)
    surname = db.Column(db.String(40), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False,
                           default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    is_active = db.Column(db.Boolean, default=True, server_default='true')

    def __repr__(self):
        return f"User('{self.name}', '{self.surname}', '{self.email}', '{self.image_file}')"
    

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []

    @classmethod
    def lookup(cls, email):
        return cls.query.filter_by(email=email).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.is_active
        