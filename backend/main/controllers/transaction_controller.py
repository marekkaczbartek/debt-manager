from services import debt_service
from services import transaction_service
from flask import request, jsonify
from services import user_service, group_service


def get_transactions():
    transactions = transaction_service.get_transactions()
    return jsonify([t.to_json() for t in transactions]), 200


def get_transaction_by_id(transaction_id):
    transaction = transaction_service.get_transaction_by_id(transaction_id)
    return jsonify(transaction.to_json()), 200


def settle_transaction_by_id(transaction_id):
    amount: int = request.get_json().get("amount")
    transaction = transaction_service.settle_transaction_by_id(transaction_id, amount)
    return jsonify(transaction.to_json()), 200


def delete_transactions():
    transaction_service.delete_transactions()
    return jsonify({"message": "Transactions deleted"}), 204


def delete_transaction_by_id(transaction_id: int):
    transaction = transaction_service.delete_transaction_by_id(transaction_id)
    if transaction:
        return jsonify(transaction.to_json()), 204


def add_transaction_for_multiple_users():
    data = request.get_json()
    amount = data.get("amount")
    user_owed_id = data.get("user_owed_id")
    user_owing_ids = data.get("user_owing_ids")
    group_id = data.get("group_id")

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
