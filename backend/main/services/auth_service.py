from services.user_service import get_user_by_email


def validate_user(email: str, password: str) -> bool:
    user = get_user_by_email(email)
    return user and user.password == password
