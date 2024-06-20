from itertools import islice
from typing import List
from config import db
from models import Transaction
from services import group_service


def add_transaction(
    amount: float, group_id: int, user_owed_id: int, user_owing_id: int
):
    transaction = Transaction(amount, group_id, user_owed_id, user_owing_id)
    db.session.add(transaction)
    db.session.commit()
    return transaction


def get_transactions() -> List[Transaction]:
    transactions = Transaction.query.all()
    return [transaction for transaction in transactions]


def get_transaction_by_id(transaction_id: int) -> Transaction:
    transaction = Transaction.query.get(transaction_id)
    return transaction


def settle_transaction_by_id(transaction_id: int, amount: float):
    transaction = get_transaction_by_id(transaction_id)
    transaction.amount = max(transaction.amount - amount, 0)
    db.session.commit()
    return transaction


def delete_transactions():
    Transaction.query.delete()
    db.session.commit()


def delete_transaction_by_id(transaction_id: int):
    transaction = get_transaction_by_id(transaction_id)
    if transaction:
        db.session.delete(transaction)
        db.session.commit()
    return transaction


def divide_transaction(
    amount: float, user_owing_ids: List[int]
) -> List[tuple[float, int]]:
    sub_amount = round(amount / len(user_owing_ids), 2)
    return [(sub_amount, user_owing_id) for user_owing_id in user_owing_ids]


def simplify_transactions(group_id: int) -> List[Transaction]:
    balance_list = group_service.get_group_balance_list(group_id)
    simplified_transactions = []
    for i in range(len(balance_list) - 1):
        balance1 = balance_list[i]
        for balance2 in islice(balance_list, i + 1, len(balance_list)):
            if balance1["balance"] * balance2["balance"] < 0:
                if balance1["balance"] > 0:
                    transaction = Transaction(
                        amount=balance1["balance"],
                        group_id=group_id,
                        user_owed_id=balance1["user_id"],
                        user_owing_id=balance2["user_id"],
                    )
                else:
                    transaction = Transaction(
                        amount=-balance1["balance"],
                        group_id=group_id,
                        user_owed_id=balance2["user_id"],
                        user_owing_id=balance1["user_id"],
                    )
                balance2["balance"] += balance1["balance"]
                simplified_transactions.append(transaction)
                break

    Transaction.query.filter_by(group_id=group_id).delete()
    for transaction in simplified_transactions:
        db.session.add(transaction)

    db.session.commit()
    return [t for t in simplified_transactions]
