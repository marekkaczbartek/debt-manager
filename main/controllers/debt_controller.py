from flask import request, jsonify
from services import debt_service, user_service, group_service


# def add_debt():
#     data = request.get_json()

#     user_owed = user_service.get_user_by_id(data["user_owed_id"])
#     user_owing = user_service.get_user_by_id(data["user_owing_id"])
#     group = group_service.get_group_by_id(data["group_id"])

#     if not user_owed or not user_owing:
#         return jsonify({"error": "User not found"}), 404
#     if not group:
#         return jsonify({"error": "Group not found"}), 404
#     if user_owed not in group.users or user_owing not in group.users:
#         return jsonify({"error": "User not in group"}), 400
#     try:
#         debt_service.add_debt(
#             data["amount"],
#             data["description"],
#             data["group_id"],
#             data["user_owed_id"],
#             data["user_owing_id"],
#         )
#     except Exception as e:
#         return {"error": str(e)}, 400
#     return jsonify({"message": "Debt added"}), 201


def get_debts():
    debts = debt_service.get_debts()
    return jsonify(debts), 200


def add_debt_for_multiple_users():
    data = request.get_json()
    amount = data["amount"]
    user_owed_id = data["user_owed_id"]
    user_owing_ids = data["user_owing_ids"]
    description = data["description"]
    group_id = data["group_id"]

    user_owed = user_service.get_user_by_id(user_owed_id)
    if not user_owed:
        return jsonify({"error": "User not found"}), 404

    group = group_service.get_group_by_id(group_id)
    if not group:
        return jsonify({"error": "Group not found"}), 404

    if user_owed not in group.users:
        return jsonify({"error": "User not in group"}), 400

    user_owing_ids = list(set(user_owing_ids))
    for user_owing_id in user_owing_ids:
        user_owing = user_service.get_user_by_id(user_owing_id)
        if not user_owing:
            return jsonify({"error": "User not found"}), 404
        if user_owing not in group.users:
            return jsonify({"error": "User not in group"}), 400

    debts = debt_service.divide_debt(amount, user_owing_ids)

    for sub_amount, user_owing_id in debts:
        debt_service.add_debt(
            amount=sub_amount,
            description=description,
            group_id=group_id,
            user_owed_id=user_owed_id,
            user_owing_id=user_owing_id,
        )

    return jsonify({"message": "Debts added"}), 201
