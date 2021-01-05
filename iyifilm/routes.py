from iyifilm import app, bcrypt, db, guard, cors
from iyifilm.models import User, Film, Serializer, Review

from flask_login import login_user, current_user, logout_user

from flask import request, jsonify, redirect, url_for

import flask_praetorian

import random

@app.route("/", methods=['GET', 'POST'])
@app.route("/home", methods=['GET', 'POST'])
def home():
    return "Hello, this is IYI Film's API"

# Örneğin http://127.0.0.1:5000/film/all adresi bütün
# filmleri döndürecek.
@app.route('/film/all', methods=['GET', 'POST'])
def film_all():
    films = Film.query.all()
    return jsonify(Serializer.serialize_list(films))

# Bu API'a örneğin şu şekilde ulaşılacak:
# http://127.0.0.1:5000/film/?id=2
@app.route('/film/', methods=['GET', 'POST'])
def film_by_id():
    if "id" in request.args:
        id = int(request.args["id"])
    else:
        return "Error: No id field provided. Please specify an id."

    film = Film.query.filter_by(id=id).first()
    print(film)
    if film:
        return jsonify(film.serialize())
    return jsonify([])

# Bir film için yapılan tüm değerlendirmeleri verir
# Örnek http://127.0.0.1:5000/review/?film_id=2
@app.route('/review/', methods=['GET', 'POST'])
def review_by_filmid():
    if "film_id" in request.args:
        film_id = int(request.args["film_id"])
    else:
        return "Error: No film_id field provided. Please specify an id."

    review = Review.query.filter_by(film_id=film_id)

    print(review)
    if review:
        return jsonify(Serializer.serialize_list(review))
    return jsonify([])

@app.route("/addreview", methods=['POST'])
@flask_praetorian.auth_required
def add_review():
    data = request.get_json(force=True)

    current_user_id = flask_praetorian.current_user().id
    print("İste id:{}".format(current_user_id))

    review = Review(id=random.getrandbits(32), user_id=int(current_user_id), 
                    film_id=int(data["film_id"]), text=data["review"],
                    rate=int(data["score"]))

    db.session.add(review)
    db.session.commit()

    print("New review added. film_id:{}".format(data["film_id"]))
    return "OK"

@app.route("/searchfilm/", methods=['GET', 'POST'])
def search():
    # GET request
    if "query" in request.args:
        query = str(request.args["query"]).lower()
    else:
        return "Error: No query field provided. Please specify an query."

    print("Query geldi:", query)
    results = []

    films = Film.query.all()
    for film in films:
        if query in film.name.lower():
            results.append(film)
    
    if results:
        return jsonify(Serializer.serialize_list(results))
    return jsonify([])

@app.route('/api/login', methods=['POST'])
def login():
    """
    Logs a user in by parsing a POST request containing user credentials and
    issuing a JWT token.
    .. example::
       $ curl http://localhost:5000/api/login -X POST \
         -d '{"username":"Yasoob","password":"strongpassword"}'
    """
    req = request.get_json(force=True)
    email = req.get('email', None)
    password = req.get('password', None)
    user = guard.authenticate(email, password)
    ret = {'access_token': guard.encode_jwt_token(user)}
    return ret, 200

  
@app.route('/api/refresh', methods=['POST'])
def refresh():
    """
    Refreshes an existing JWT by creating a new one that is a copy of the old
    except that it has a refrehsed access expiration.
    .. example::
       $ curl http://localhost:5000/api/refresh -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    print("refresh request")
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200
  
  
@app.route('/api/protected')
@flask_praetorian.auth_required
def protected():
    """
    A protected endpoint. The auth_required decorator will require a header
    containing a valid JWT
    .. example::
       $ curl http://localhost:5000/api/protected -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    return {'message': f'protected endpoint (allowed user {flask_praetorian.current_user().email})'}


@app.route("/registersystem", methods=['POST'])
def register_system():
    data = request.get_json(force=True)
    
    form_email = data["email"]
    form_password = data["password"]

    print("Register request. Email", form_email)
    print("Regsiter request. Passw", form_password)

    hashed_pw = bcrypt.generate_password_hash(form_password).decode("utf-8")

    user = User(name=data["name"], surname=data["surname"], email=form_email, 
                password=hashed_pw)

    db.session.add(user)
    db.session.commit()

    return "OK"


"""
@app.route('/isuserloggedin', methods=['GET', 'POST'])
def is_user_loggedin():
    if current_user.is_authenticated:
        return "True"
    else:
        return "False"


@app.route("/logout", methods=['GET', 'POST'])
def logout():
    logout_user()
    print("User logged out.")
    return redirect(url_for('home'))

@app.route("/registersystem", methods=['POST'])
def register_system():
    data = request.get_json(force=True)
    # "name":"Ahmet","surname":"Durmaz","email":"ahmetd@gmail.com","password":"ahmetinsifresi"
    
    form_email = data["email"]
    form_password = data["password"]

    print("Register request. Email", form_email)
    print("Regsiter request. Passw", form_password)

    if current_user.is_authenticated:
        print("Zaten giris yapılmıştı.")
        return redirect("http://localhost:3000/home")

    hashed_pw = bcrypt.generate_password_hash(form_password).decode("utf-8")

    user = User(name=data["name"], surname=data["surname"], email=data["email"], password=hashed_pw)

    db.session.add(user)
    db.session.commit()

    return "OK"


@app.route("/loginsystem", methods=['POST'])
def login_system():
    data = request.get_json(force=True)

    form_email = data["email"]
    form_password = data["password"]

    print("Login request. Email", form_email)
    print("Login request. Passw", form_password)

    user = User.query.filter_by(email=form_email).first()

    if user and bcrypt.check_password_hash(user.password, form_password):
        print("Giris basarili")
        print(user)
        print(current_user.is_authenticated)
        login_user(user, remember=True)
        print(current_user.is_authenticated)

        return redirect(url_for('http://localhost:3000/home'))
    else:
        print("Giris basarisiz")

    return "OK"
"""