from itertools import islice
from typing import List
from config import db
from models import Debt
from services import group_service


def add_debt(amount, description, group_id, user_owed_id, user_owing_id) -> None:
    debt = Debt(amount, description, group_id, user_owed_id, user_owing_id)
    db.session.add(debt)
    db.session.commit()


def get_debts() -> List[dict]:
    debts = Debt.query.all()
    return [debt.to_json() for debt in debts]


def divide_debt(amount, user_owing_ids) -> List[tuple[float, int]]:
    sub_amount = round(amount / len(user_owing_ids), 2)
    return [(sub_amount, user_owing_id) for user_owing_id in user_owing_ids]


def simplify_debts(group_id: int) -> List[Debt]:
    balance_list = group_service.get_group_balance_list(group_id)
    simplified_debts = []
    for i in range(len(balance_list) - 1):
        balance1 = balance_list[i]
        for balance2 in islice(balance_list, i + 1, len(balance_list)):
            if balance1["balance"] * balance2["balance"] < 0:
                if balance1["balance"] < 0:
                    debt = Debt(
                        amount=-balance1["balance"],
                        description="",
                        group_id=group_id,
                        user_owed_id=balance1["user_id"],
                        user_owing_id=balance2["user_id"],
                    )
                else:
                    debt = Debt(
                        amount=balance1["balance"],
                        description="",
                        group_id=group_id,
                        user_owed_id=balance2["user_id"],
                        user_owing_id=balance1["user_id"],
                    )
                balance2["balance"] += balance1["balance"]
                simplified_debts.append(debt)
                break

    Debt.query.filter_by(group_id=group_id).delete()
    for debt in simplified_debts:
        db.session.add(debt)

    db.session.commit()
    return [d.to_json() for d in simplified_debts]
