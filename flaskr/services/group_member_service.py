from config import db
from models import GroupMember


def add_user_to_group(user_id: int, group_id: int):
    group_member = GroupMember(user_id, group_id)
    db.session.add(group_member)
    db.session.commit()


def get_users_from_group(group_id: int):
    return GroupMember.query.filter_by(group_id=group_id).all()
