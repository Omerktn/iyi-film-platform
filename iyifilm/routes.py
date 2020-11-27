from iyifilm import app, bcrypt, db

from flask import request, jsonify

@app.route("/", methods=['GET', 'POST'])
@app.route("/home", methods=['GET', 'POST'])
def home():
    return "Hello, this is IYI Film"

films = [
    {"id": 0,
     "title": "Limonata"},
    {"id": 1,
     "title": "Ölümlü Dünya"},
    {"id": 2,
     "title": "Trainspotting"},
]

# Örneğin http://127.0.0.1:5000/films/all adresi bütün
# filmleri döndürecek.
@app.route('/films/all', methods=['GET'])
def film_all():
    return jsonify(films)

# Bu API'a örneğin şu şekilde ulaşılacak:
# http://127.0.0.1:5000/films/?id=2
@app.route('/films/', methods=['GET'])
def film_by_id():
    if "id" in request.args:
        id = int(request.args["id"])
    else:
        return "Error: No id field provided. Please specify an id."

    results = []

    global films
    for film in films:
        if film["id"] == id:
            results.append(film)

    return jsonify(results)