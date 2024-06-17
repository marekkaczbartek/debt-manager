from flask import request, jsonify
from config import app
from datetime import datetime, timedelta
import jwt

from services.auth_service import validate_user


def login():
    user = request.json

    if not user:
        return jsonify({"message": "User details not provided"}), 400

    if not validate_user(user.get("email"), user.get("password")):
        return jsonify({"message": "Wrong email or password"}), 400

    token = jwt.encode(
        {
            "email": user.get("email"),
            "expiration": str(datetime.now() + timedelta(seconds=120)),
        },
        app.config["SECRET_KEY"],
        algorithm="HS256",
    )
    return jsonify(
        {"token": jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])}
        # user
    )
