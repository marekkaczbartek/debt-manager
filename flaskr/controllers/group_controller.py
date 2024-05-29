from flask import request, jsonify
from services import group_service, user_service


def get_groups():
    groups = group_service.get_groups()
    return [group.to_json() for group in groups]


def get_group_by_id(group_id: int):
    return group_service.get_group_by_id(group_id).to_json()


def create_group():
    data = request.get_json()
    name = data.get("name")

    if not name:
        return jsonify({"error": "Missing data"}), 400

    try:
        group_service.create_group(name)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"message": "Group created"}), 201


def add_user_to_group(user_id: int, group_id: int):
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


def get_users_from_group(group_id: int):
    users = group_service.get_users_from_group(group_id)
    return [user.to_json() for user in users]


def delete_group(group_id: int):
    group = group_service.delete_group(group_id)

    if not group:
        return jsonify({"error": "Group not found"}), 404

    return jsonify({"message": "Group deleted"}), 204
