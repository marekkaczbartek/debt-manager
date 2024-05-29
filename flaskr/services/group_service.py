from models import Group, GroupMember
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
    group_member = GroupMember(user_id, group_id)
    db.session.add(group_member)
    db.session.commit()


def get_users_from_group(group_id: int):
    return [
        user_service.get_user_by_id(member.user_id)
        for member in GroupMember.query.filter_by(group_id=group_id).all()
    ]
