
from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)

@app.route('/')
def sessions():
    return render_template('board.html')

def messageReceived(methods=['GET', 'POST']):
    print('message was received.')

@socketio.on('my_event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my_response', json, callback=messageReceived)

# @app.route("/typo/dictionaries/en_US/en_US.aff")
# def aff():
    # return Response(open("/typo/dictionaries/en_US/en_US.aff").read(), mimetype='text/plain')
    
# @app.route("/typo/dictionaries/en_US/en_US.dic")
# def dic():
    # return Response(open("/typo/dictionaries/en_US/en_US.dic").read(), mimetype='text/plain')

if __name__ == '__main__':
    socketio.run(app, debug=True)
