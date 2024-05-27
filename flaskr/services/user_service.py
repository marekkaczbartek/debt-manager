from flask import request, jsonify
from config import app, db
from models import User


def get_user_by_email(email: str):
    return User.query.filter_by(email=email).first()
