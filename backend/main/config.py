from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5173"}})

jwt = JWTManager(app)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config["JWT_TOKEN_LOCATION"] = ["headers"]

load_dotenv()

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///debtmanagerdb.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)
