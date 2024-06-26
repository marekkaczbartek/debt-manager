from flask import request, jsonify
from flask_jwt_extended import (
    create_access_token,
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
