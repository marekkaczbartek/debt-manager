from config import app, db
from routes.user_routes import user_blueprint
from routes.group_routes import group_blueprint
from routes.transaction_routes import transaction_blueprint

if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all()

    app.register_blueprint(user_blueprint, url_prefix="/users")
    app.register_blueprint(group_blueprint, url_prefix="/groups")
    app.register_blueprint(transaction_blueprint, url_prefix="/transactions")

    app.run(debug=True)
