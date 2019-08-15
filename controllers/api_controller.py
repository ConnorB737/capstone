import urllib

from flask import jsonify, request, render_template, redirect, url_for, Blueprint
from flask_login import login_required, current_user, login_user, logout_user
from flask_wtf import FlaskForm
from werkzeug.exceptions import NotFound
from werkzeug.security import check_password_hash
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Email, Length
from pony.orm import select

from models.game import Game
from models.user import login_manager, User
from service.game_service import build_game, join_existing_game, GameError


class UserForm(FlaskForm):
    email = StringField('email',  validators=[InputRequired(), Email(message='Invalid email'), Length(max=30)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=8, max=20)])


api = Blueprint('api', __name__)

@api.route("/", methods=["GET"])
@login_required
def dashboard():
    joined_games = select(game for game in Game if current_user in game.players)
    open_games = select(game for game in Game if current_user not in game.players and len(game.players) < 2)
    return render_template(
        "dashboard.html",
        joined_games=joined_games,
        open_games=open_games,
    )

@api.route("/game", methods=["POST"])
@login_required
def create_game():
    game = build_game(current_user)
    return jsonify({
        'url': urllib.parse.urljoin(request.base_url, f'game/{game.id}'),
    })

@api.route("/game/<int:game_id>", methods=["GET"])
@login_required
def join_game(game_id):
    try:
        game = join_existing_game(game_id, current_user)
    except GameError as e:
        raise NotFound(description=str(e))
    else:
        return render_template("board.html")

@api.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("dashboard"))
    form = UserForm()
    if request.method == 'POST':
        if form.validate():
            check_user = select(user for user in User if user.login == form.email.data).first()
            if check_user:
                if check_password_hash(check_user.password, form.password.data):
                    login_user(check_user)
                    return redirect(request.args.get('next'))
    return render_template('login.html', form=form, next=request.args.get('next'))

@api.route("/logout", methods=["GET"])
def logout():
    if current_user.is_authenticated:
        logout_user()
    return redirect(url_for("login", next=url_for("dashboard")))

@login_manager.user_loader
def load_user(user_id):
    return User[user_id]
