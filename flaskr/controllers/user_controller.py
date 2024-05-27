from flask import request, jsonify
from config import db
from models import User
from services.user_service import get_user_by_email


def get_users():
    users = User.query.all()
    return [user.to_json() for user in users]


def get_user_by_id(user_id: int):
    user = User.query.get(user_id)
    if user:
        return user.to_json()
    return jsonify({"error": "User not found"}), 404


def create_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if not (username and password and email):
        return jsonify({"error": "Missing data"}), 400

    if get_user_by_email(email):
        return jsonify({"error": "User already exists"}), 400

    user = User(username, password, email)
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"message": "User created"}), 201


def delete_user(user_id: int):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted"})
    return jsonify({"error": "User not found"}), 404
