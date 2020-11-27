from iyifilm import app, bcrypt, db

@app.route("/", methods=['GET', 'POST'])
@app.route("/home", methods=['GET', 'POST'])
def home():
    return "Hello, this is IYI Film"