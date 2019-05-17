#usr/bin/python
#coding=utf-8

from flask import Flask, jsonify,request, make_response
import pymongo
from flask_cors import *

app = Flask(__name__)
CORS(app, supports_credentials=True)

myclient = pymongo.MongoClient('mongodb://localhost:27017')
mydb = myclient['films']
mycol = mydb['films_all']

@app.route('/api/v1.0/films_count', methods=['GET'])
def get_total_count():
    totalCount = mycol.find().count()
    return jsonify({'totalCount': totalCount})

@app.route('/api/v1.0/films', methods=['GET'])
def get_films():
    if request.args.get('id'):
        film = mycol.find({"_id": request.args.get('id')})
        return jsonify({'films': list(film)})
    else:
        pageNum = int(request.args.get('pageNum'))
        limit = int(request.args.get('limit'))
        films = mycol.find({}).limit(limit).skip(limit*(pageNum-1)).sort([('_id', 1)])
        num = mycol.find().count()

        return jsonify({'pageNum': pageNum,'limit': limit, 'films': list(films), 'num': num})


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == '__main__':
    app.run(debug=True)