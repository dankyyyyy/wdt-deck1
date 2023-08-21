from flask import Flask, request
import cds_api_fetcher

appFlask = Flask(__name__)

@appFlask.route("/data/<c1>/<c2>/<c3>/<c4>/<name>", methods = ['GET'])
def getData(c1, c2, c3, c4, name):
	result = cds_api_fetcher.retrieve(c1, c2, c3, c4, name)
	return result[0], result[1]

if __name__ == "__main__":	
	appFlask.run(debug=True, host="127.0.0.1", port=5555)