from config import db


group_user = db.Table(
    "group_user",
    db.Column("user_id", db.Integer, db.ForeignKey("user.id")),
    db.Column("group_id", db.Integer, db.ForeignKey("group.id")),
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    debts = db.relationship(
        "Debt", foreign_keys="Debt.user_owing_id", back_populates="user_owing"
    )
    loans = db.relationship(
        "Debt", foreign_keys="Debt.user_owed_id", back_populates="user_owed"
    )

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email

    def to_json(self):
        return {"id": self.id, "username": self.username, "email": self.email}


class Debt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    settled = db.Column(db.Boolean, default=False)
    group_id = db.Column(db.Integer, db.ForeignKey("group.id"), nullable=False)
    user_owed_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    user_owing_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    user_owed = db.relationship(
        "User", foreign_keys=[user_owed_id], back_populates="loans"
    )
    user_owing = db.relationship(
        "User", foreign_keys=[user_owing_id], back_populates="debts"
    )

    def __init__(self, amount, description, group_id, user_owed_id, user_owing_id):
        self.amount = amount
        self.description = description
        self.group_id = group_id
        self.user_owed_id = user_owed_id
        self.user_owing_id = user_owing_id

    def to_json(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "description": self.description,
            "date": self.date,
            "group_id": self.group_id,
            "user_owed_id": self.user_owed_id,
            "user_owing_id": self.user_owing_id,
            "settled": self.settled,
        }


class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    users = db.relationship("User", secondary=group_user, backref="groups")
    debts = db.relationship("Debt", backref="group", lazy=True)

    def __init__(self, name):
        self.name = name

    def to_json(self):
        return {"id": self.id, "name": self.name}
