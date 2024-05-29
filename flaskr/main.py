from config import app, db
from flaskr.routes.user_routes import user_blueprint
from flaskr.routes.group_routes import group_blueprint

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.register_blueprint(user_blueprint, url_prefix="/users")
    app.register_blueprint(group_blueprint, url_prefix="/groups")

    app.run(debug=True)
