from services import debt_service
from services import transaction_service
from flask import request, jsonify
from services import user_service, group_service


# def add_transaction():
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
#         transaction_service.add_transaction(
#             data["amount"],
#             data["description"],
#             data["group_id"],
#             data["user_owed_id"],
#             data["user_owing_id"],
#         )
#     except Exception as e:
#         return {"error": str(e)}, 400
#     return jsonify({"message": "Transaction added"}), 201


def get_transactions():
    transactions = transaction_service.get_transactions()
    return jsonify(transactions), 200


def delete_transactions():
    transaction_service.delete_transactions()
    return jsonify({"message": "Transactions deleted"}), 204


def add_transaction_for_multiple_users():
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

    # debt_service.add_debt(amount, description, group_id, user_owed_id)
    transactions = transaction_service.divide_transaction(amount, user_owing_ids)

    for sub_amount, user_owing_id in transactions:
        transaction_service.add_transaction(
            amount=sub_amount,
            group_id=group_id,
            user_owed_id=user_owed_id,
            user_owing_id=user_owing_id,
        )

    transaction_service.simplify_transactions(group_id)

    return jsonify({"message": "Transactions added"}), 201
