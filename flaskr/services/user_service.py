from models import GroupMember, User
from config import db
from services import group_service


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
    return [
        group_service.get_group_by_id(member.group_id)
        for member in GroupMember.query.filter_by(user_id=user_id).all()
    ]
