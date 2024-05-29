from flask import jsonify
from services import group_member_service
from services.group_service import get_group_by_id
from services.user_service import get_user_by_id


def add_user_to_group(user_id: int, group_id: int):
    if not user_id or not group_id:
        return jsonify({"error": "Missing data"}), 400

    if not get_user_by_id(user_id):
        return jsonify({"error": "User not found"}), 404

    if not get_group_by_id(group_id):
        return jsonify({"error": "Group not found"}), 404

    try:
        group_member_service.add_user_to_group(user_id, group_id)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"message": "User added to group"}), 201
