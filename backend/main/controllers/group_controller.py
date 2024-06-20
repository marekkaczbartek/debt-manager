from flask import request, jsonify
from services import group_service, user_service
from flask_jwt_extended import jwt_required


@jwt_required()
def get_groups():
    groups = group_service.get_groups()
    return [group.to_json() for group in groups]


@jwt_required()
def get_group_by_id(group_id: int):
    return group_service.get_group_by_id(group_id).to_json()


@jwt_required()
def create_group():
    data = request.get_json()
    name = data.get("name")
    owner_id = data.get("owner_id")

    if not name or not owner_id:
        return jsonify({"error": "Missing data"}), 400

    try:
        group = group_service.create_group(name, owner_id)
        add_user_to_group(group.id, owner_id)

    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"message": "Group created", "group": group.to_json()}), 201


@jwt_required()
def add_user_to_group(group_id: int, user_id: int = None):
    if not user_id:
        user_id = request.get_json().get("user_id")

    if not user_id or not group_id:
        return jsonify({"error": "Missing data"}), 400

    if not user_service.get_user_by_id(user_id):
        return jsonify({"error": "User not found"}), 404

    if not group_service.get_group_by_id(group_id):
        return jsonify({"error": "Group not found"}), 404

    try:
        group_service.add_user_to_group(user_id, group_id)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"message": "User added to group"}), 201


@jwt_required()
def get_users_from_group(group_id: int):
    users = group_service.get_users_from_group(group_id)
    return [user.to_json() for user in users]


@jwt_required()
def delete_group(group_id: int):
    group = group_service.delete_group(group_id)

    if not group:
        return jsonify({"error": "Group not found"}), 404

    return jsonify({"message": "Group deleted"}), 204


def delete_groups():
    group_service.delete_groups()
    return jsonify({"message": "All groups deleted"})


@jwt_required()
def delete_user_from_group(group_id: int, user_id: int):
    group = group_service.delete_user_from_group(user_id, group_id)

    if not group:
        return jsonify({"error": "Group or user not found"}), 404

    return jsonify({"message": "User removed from group"}), 204


@jwt_required()
def get_group_balance_list(group_id: int):
    return jsonify(group_service.get_group_balance_list(group_id)), 200


@jwt_required()
def get_group_transactions(group_id: int):
    return [
        transaction.to_json()
        for transaction in group_service.get_group_transactions(group_id)
    ], 200
