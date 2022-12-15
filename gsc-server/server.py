from googleapiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials
from flask import Flask, request, jsonify
from flask_cors import CORS

SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']
API_SERVICE_NAME = 'searchconsole' 
API_VERSION = 'v1'

app = Flask(__name__)
CORS(app)

def handleUrl(url):
    if url[len(url) - 1] == '/':
        return url[:(len(url) - 1)]
    else:
        return url + '/'

def getResult(url, startDate, endDate):
    if "worksheetzone.org" in url:
        site_url = "sc-domain:worksheetzone.org"
        cred = ServiceAccountCredentials.from_json_keyfile_name(
        "./micro-enigma-235001-445793a37c7f.json",
        scopes=SCOPES) 

    else:
        if url.find("/", 8) > -1:
            site_url = url[:url.find("/", 8)] + "/"
        elif url.find("/", 8) == -1:
            site_url = url + "/"
        cred = ServiceAccountCredentials.from_json_keyfile_name(
            "./abcmanagement-e0299-9ca32dd3ba26.json",
            scopes=SCOPES)
    search_console_service = build(
        API_SERVICE_NAME, API_VERSION, credentials=cred)
    result = search_console_service.searchanalytics().query(siteUrl=site_url, body={
        'startDate': startDate,
        'endDate': endDate,
        "dimensions": ["query"],
        'dimensionFilterGroups': [{
            'filters': [{
                        'dimension': 'page',
                        'expression': url,
                        }]
        }],
    }).execute()
    return result


@app.route("/gsc", methods=['POST'])
def getGscData():
    startDate = request.form['startDate']
    endDate = request.form['endDate']
    url1 = request.form['url']
    url2 = handleUrl(url1)
    result1 = getResult(url1, startDate, endDate)
    result2 = getResult(url2, startDate, endDate)

    if "rows" in result1:
        rows = result1["rows"]
    elif "rows" in result2:
        rows = result2["rows"]
    else:
        rows = []
    return jsonify(rows), 200

if __name__ == "__main__":
    app.run(debug=True, port=8000)