from flask import request, jsonify


def login():
    user = request.json

    if not user:
        return jsonify({"message": "User details not provided"}, 400)
