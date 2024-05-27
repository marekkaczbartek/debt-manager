from flask import request, jsonify
from config import app, db
from models import User
from routes import user_blueprint

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.register_blueprint(user_blueprint)

    app.run(debug=True)
