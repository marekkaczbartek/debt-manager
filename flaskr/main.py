from config import app, db
from routes import user_blueprint

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.register_blueprint(user_blueprint)

    app.run(debug=True)
