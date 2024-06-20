from services.user_service import get_user_by_email
from bcrypt import checkpw


def validate_user(email: str, password: str) -> bool:
    user = get_user_by_email(email)
    return user and checkpw(password.encode("utf-8"), user.password)
