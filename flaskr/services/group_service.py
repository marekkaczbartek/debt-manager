from models import Group
from config import db
from services import user_service


def get_groups():
    return Group.query.all()


def get_group_by_id(group_id: int):
    return Group.query.get(group_id)


def create_group(name: str):
    group = Group(name)
    db.session.add(group)
    db.session.commit()


def add_user_to_group(user_id: int, group_id: int):
    group = get_group_by_id(group_id)
    user = user_service.get_user_by_id(user_id)

    if not group or not user:
        raise Exception("Group or user not found")

    group.users.append(user)
    db.session.commit()


def get_users_from_group(group_id: int):
    return get_group_by_id(group_id).users


def delete_group(group_id: int):
    group = get_group_by_id(group_id)
    if group:
        db.session.delete(group)
        db.session.commit()
