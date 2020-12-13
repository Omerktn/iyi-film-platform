from iyifilm import app, bcrypt, db
from iyifilm.models import User, Film, Serializer

from flask import request, jsonify

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

@app.route('/test', methods=['GET', 'POST'])
def test_api():
    return {"name":"Hans Zimmer"}