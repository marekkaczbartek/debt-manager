from flask import Blueprint
from controllers.user_controller import (
    get_groups_from_user,
    get_users,
    create_user,
    get_user_by_id,
    delete_user,
    get_user_balance_in_group,
)

user_blueprint = Blueprint("user", __name__)

user_blueprint.route("/", methods=["GET"])(get_users)
user_blueprint.route("/", methods=["POST"])(create_user)
user_blueprint.route("/<int:user_id>", methods=["GET"])(get_user_by_id)
user_blueprint.route("/<int:user_id>", methods=["DELETE"])(delete_user)
user_blueprint.route("/<int:user_id>/groups", methods=["GET"])(get_groups_from_user)
user_blueprint.route("/<int:user_id>/balance/<int:group_id>", methods=["GET"])(
    get_user_balance_in_group
)
