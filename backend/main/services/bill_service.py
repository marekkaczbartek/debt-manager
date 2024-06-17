from config import db
from models import Debt


def add_bill(amount, description, group_id, user_id) -> None:
    bill = Debt(
        amount=amount, description=description, group_id=group_id, user_id=user_id
    )
    db.session.add(bill)
    db.session.commit()
