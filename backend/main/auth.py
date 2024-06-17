from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify
from config import app
import jwt
import config


def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.args.get("token")
        if not token:
            return jsonify({"Alert": "Missing token"})
        try:
            payload = jwt.decode(token, app.config["SECRET_KEY"])
        except:
            return jsonify({"Alert": "Invalid token"})

    return decorated
