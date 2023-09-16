from flask import Flask, request, jsonify
import cds_api_fetcher
from flask_cors import CORS

appFlask = Flask(__name__)

CORS(appFlask)
# The code above enables CORS for all routes in Flask app. 
# This means that it allows cross-origin requests from any domain. 
# To restrict it to a specific origin (e.g., the Vue.js app's domain), 
# we can do so by specifying the origins parameter:
# CORS(app, origins="http://thedomain.com")

@appFlask.route("/data/<c1>/<c2>/<c3>/<c4>/<name>", methods = ['GET'])
def getData(c1, c2, c3, c4, name):
	result = cds_api_fetcher.retrieve(c1, c2, c3, c4, name)
	return result[0], result[1]

@appFlask.route("/delete/<filename>", methods=['DELETE'])
def deleteFile(filename):
    try:
        # Call the method in the other class to delete the file
        cds_api_fetcher.deleteJson(filename)
        return jsonify({"message": f"File {filename} deleted successfully"}), 200
    except FileNotFoundError:
        return jsonify({"error": f"File {filename} not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":	
	appFlask.run(debug=True, host="127.0.0.1", port=5555)