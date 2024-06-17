from models import User, Transaction
from config import db


def get_users():
    return User.query.all()


def get_user_by_id(user_id: int):
    return User.query.get(user_id)


def get_user_by_email(email: str):
    return User.query.filter_by(email=email).first()


def create_user(username: str, password: str, email: str):
    user = User(username, password, email)
    db.session.add(user)
    db.session.commit()


def delete_user(user_id: int):
    user = get_user_by_id(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return user


def get_groups_from_user(user_id: int):
    return User.query.get(user_id).groups


def get_user_debts_in_group(user_id: int, group_id: int):
    return Transaction.query.filter_by(user_owing_id=user_id, group_id=group_id).all()


def get_user_loans_in_group(user_id: int, group_id: int):
    return Transaction.query.filter_by(user_owed_id=user_id, group_id=group_id).all()


def get_user_balance_in_group(user_id: int, group_id):
    debt_balance = sum(
        [debt.amount for debt in get_user_debts_in_group(user_id, group_id)]
    )
    loan_balance = sum(
        [loan.amount for loan in get_user_loans_in_group(user_id, group_id)]
    )
    return loan_balance - debt_balance
