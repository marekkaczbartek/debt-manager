from models import User
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


def get_user_debts(user_id: int):
    return User.query.get(user_id).debts


def get_user_loans(user_id: int):
    return User.query.get(user_id).loans


def get_user_balance(user_id: int):
    debt_balance = sum([debt.amount for debt in get_user_debts(user_id)])
    loan_balance = sum([loan.amount for loan in get_user_loans(user_id)])
    return loan_balance - debt_balance
