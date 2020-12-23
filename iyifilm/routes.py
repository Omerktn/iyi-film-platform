from iyifilm import app, bcrypt, db
from iyifilm.models import User, Film, Serializer, Review

from flask import request, jsonify
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
def add_review():
    data = request.get_json()
    
    review = Review(id=random.getrandbits(32), user_id=int(data["user_id"]),
        film_id=int(data["film_id"]), text=data["text"], rate=int(data["rate"]))

    db.session.add(review)
    db.session.commit()

    print("New review added.")
    return "OK"