from flask import Blueprint
from controllers import transaction_controller

transaction_blueprint = Blueprint("transaction", __name__)

transaction_blueprint.route("/", methods=["POST"])(
    transaction_controller.add_transaction_for_multiple_users
)
transaction_blueprint.route("/", methods=["GET"])(
    transaction_controller.get_transactions
)
