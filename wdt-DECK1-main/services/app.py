import logging
from flask import Flask
from flask_cors import CORS
from api_controller import api_blueprint

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


app.register_blueprint(api_blueprint, url_prefix='/api/v1')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
