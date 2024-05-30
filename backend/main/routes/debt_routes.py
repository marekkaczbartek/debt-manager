from flask import Blueprint
from controllers import debt_controller

debt_blueprint = Blueprint("debt", __name__)

debt_blueprint.route("/", methods=["POST"])(debt_controller.add_debt_for_multiple_users)
debt_blueprint.route("/", methods=["GET"])(debt_controller.get_debts)
