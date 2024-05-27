from flask import Blueprint
from controllers.user_controller import (
    get_users,
    create_user,
    get_user_by_id,
    delete_user,
)

user_blueprint = Blueprint("user", __name__)

user_blueprint.route("/users", methods=["GET"])(get_users)
user_blueprint.route("/users", methods=["POST"])(create_user)
user_blueprint.route("/users/<int:user_id>", methods=["GET"])(get_user_by_id)
user_blueprint.route("/users/<int:user_id>", methods=["DELETE"])(delete_user)
