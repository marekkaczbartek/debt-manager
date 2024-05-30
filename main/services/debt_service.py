from typing import List
from config import db
from models import Debt


def add_debt(amount, description, group_id, user_owed_id, user_owing_id):
    debt = Debt(amount, description, group_id, user_owed_id, user_owing_id)
    db.session.add(debt)
    db.session.commit()


def get_debts():
    debts = Debt.query.all()
    return [debt.to_json() for debt in debts]


def divide_debt(amount, user_owing_ids):
    sub_amount = round(amount / len(user_owing_ids), 2)
    return [(sub_amount, user_owing_id) for user_owing_id in user_owing_ids]
