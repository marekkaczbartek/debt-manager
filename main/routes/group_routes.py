from flask import Blueprint
from controllers import group_controller

group_blueprint = Blueprint("group", __name__)

group_blueprint.route("/", methods=["GET"])(group_controller.get_groups)
group_blueprint.route("/", methods=["POST"])(group_controller.create_group)
group_blueprint.route("/<int:group_id>", methods=["GET"])(
    group_controller.get_group_by_id
)
group_blueprint.route("/<int:group_id>/users/<int:user_id>", methods=["POST"])(
    group_controller.add_user_to_group
)
group_blueprint.route("/<int:group_id>/users", methods=["GET"])(
    group_controller.get_users_from_group
)
group_blueprint.route("/<int:group_id>", methods=["DELETE"])(
    group_controller.delete_group
)
