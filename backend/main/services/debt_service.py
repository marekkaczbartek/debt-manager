from config import db
from models import Debt


def add_debt(amount, description, group_id, user_id) -> None:
    debt = Debt(
        amount=amount, description=description, group_id=group_id, user_id=user_id
    )
    db.session.add(debt)
    db.session.commit()
