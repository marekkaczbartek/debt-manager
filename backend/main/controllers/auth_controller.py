from flask import request, jsonify
from config import app
from datetime import datetime, timedelta
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    set_access_cookies,
)

from services.auth_service import validate_user


def login():
    user = request.json

    if not user:
        return jsonify({"message": "User details not provided"}), 400

    if not validate_user(user.get("email"), user.get("password")):
        return jsonify({"message": "Wrong email or password"}), 400

    access_token = create_access_token(identity=user.get("email"))
    return jsonify({"accessToken": access_token}), 200
