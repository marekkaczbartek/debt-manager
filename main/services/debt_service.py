from config import db
from models import Debt
from services import group_service, user_service


def add_debt(amount, description, group_id, user_owed_id, user_owing_id):
    debt = Debt(amount, description, group_id, user_owed_id, user_owing_id)
    db.session.add(debt)
    db.session.commit()


def get_debts():
    debts = Debt.query.all()
    return [debt.to_json() for debt in debts]
