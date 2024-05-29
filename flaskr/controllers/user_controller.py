from flask import request, jsonify
from services import user_service


def get_users():
    users = user_service.get_users()
    return [user.to_json() for user in users]


def get_user_by_id(user_id: int):
    user = user_service.get_user_by_id(user_id)
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

    if user_service.get_user_by_email(email):
        return jsonify({"error": "User already exists"}), 400

    try:
        user_service.create_user(username, password, email)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"message": "User created"}), 201


def delete_user(user_id: int):
    user = user_service.delete_user(user_id)
    if user:
        return jsonify({"message": "User deleted"})
    return jsonify({"error": "User not found"}), 404


def get_groups_from_user(user_id: int):
    if not user_service.get_user_by_id(user_id):
        return jsonify({"error": "User not found"}), 404
    return [group.to_json() for group in user_service.get_groups_from_user(user_id)]
