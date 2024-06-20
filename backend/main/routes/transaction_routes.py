from flask import Blueprint
from controllers import transaction_controller

transaction_blueprint = Blueprint("transaction", __name__)

transaction_blueprint.route("/", methods=["POST"])(
    transaction_controller.add_transaction_for_multiple_users
)
transaction_blueprint.route("/", methods=["GET"])(
    transaction_controller.get_transactions
)

transaction_blueprint.route("/<int:transaction_id>", methods=["GET"])(
    transaction_controller.get_transaction_by_id
)

transaction_blueprint.route("/<int:transaction_id>/settle", methods=["PUT"])(
    transaction_controller.settle_transaction_by_id
)

transaction_blueprint.route("/<int:transaction_id>", methods=["DELETE"])(
    transaction_controller.delete_transaction_by_id
)

transaction_blueprint.route("/", methods=["DELETE"])(
    transaction_controller.delete_transactions
)
