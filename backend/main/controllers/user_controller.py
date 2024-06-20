from flask import request, jsonify
from services import user_service
from flask_jwt_extended import jwt_required, get_jwt_identity


@jwt_required()
def get_users():
    users = user_service.get_users()
    return [user.to_json() for user in users]


@jwt_required()
def get_current_user():
    current_email: str = get_jwt_identity()
    current_user = user_service.get_user_by_email(current_email)
    return current_user.to_json()


@jwt_required()
def get_user_by_id(user_id: int):
    user = user_service.get_user_by_id(user_id)
    if user:
        return user.to_json()
    return jsonify({"error": "User not found"}), 404


@jwt_required()
def get_user_by_email(user_email: str):
    user = user_service.get_user_by_email(user_email)
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
        user = user_service.create_user(username, password, email)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"message": "User created", "data": user.to_json()}), 201


# @jwt_required()
def delete_user(user_id: int):
    user = user_service.delete_user(user_id)
    if user:
        return jsonify({"message": "User deleted", "data": user.to_json()})
    return jsonify({"error": "User not found"}), 404


def delete_users():
    user_service.delete_users()
    return jsonify({"message": "All users deleted"})


@jwt_required()
def get_groups_from_user(user_id: int):
    if not user_service.get_user_by_id(user_id):
        return jsonify({"error": "User not found"}), 404
    return [group.to_json() for group in user_service.get_groups_from_user(user_id)]


@jwt_required()
def get_user_balance_in_group(user_id: int, group_id: int):
    balance = user_service.get_user_balance_in_group(user_id, group_id)
    return jsonify({"balance": balance}), 200


@jwt_required()
def get_user_balance(user_id: int):
    balance = user_service.get_user_balance(user_id)
    return jsonify({"balance": balance if balance else 0}), 200
