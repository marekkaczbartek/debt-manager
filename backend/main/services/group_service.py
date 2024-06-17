from itertools import islice
from typing import List
from models import Transaction, Group
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


def get_group_balance_list(group_id: int) -> List[dict]:
    group = get_group_by_id(group_id)
    return [
        {
            "user_id": user.id,
            "balance": user_service.get_user_balance_in_group(user.id, group_id),
        }
        for user in group.users
    ]


def get_group_debts(group_id: int) -> List[Transaction]:
    return Transaction.query.filter_by(group_id=group_id, settled=False).all()
