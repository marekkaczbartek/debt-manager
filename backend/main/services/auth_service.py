from models import User
from services.user_service import get_user_by_email


def validate_user(email: str, password: str):
    user: User = get_user_by_email(email)

    return user and user.password == password
