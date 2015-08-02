'use latest';

const express         = require('express');
const webtask         = require('webtask-tools');
const Bluebird        = require('bluebird');
const { MongoClient } = require('mongodb');

const app = express();

Bluebird.promisifyAll(MongoClient);

app.post('/', function (req, res) {
  const MONGO_URL = req.webtaskContext.data.MONGO_URL;
  const text      = req.webtaskContext.data.text;

  MongoClient.connectAsync(MONGO_URL)
    .then(db => {
      db
        .collection('todos')
        .find()
        .toArray((e, a) => {
          if(e) throw e;

          if(a.length >= 50)
            db
              .collection('todos')
              .deleteMany({}, e => {
                if(e) throw e;
              })
        });
      return db;
    })
    .then(db => {
      db
        .collection('todos')
        .insertOne({ text }, e => {
          if(e) throw e;

          res.json({
            text: req.webtaskContext.data.text
          });
        });
    })
    .catch(e => {
      console.error(e);

      res.status(500).end('Error saving to DB');
    })
});

app.get('/', function (req, res) {
  const MONGO_URL = req.webtaskContext.data.MONGO_URL;

  MongoClient.connectAsync(MONGO_URL)
    .then(db => {
      db
        .collection('todos')
        .find()
        .toArray((e, a) => {
          if(e) throw e;

          res.json(a.map(obj => obj.text));
        });
    })
    .catch(e => {
      console.error(e);

      res.status(500).end('Error loading from DB');
    })
});

// expose this express app as a webtask-compatible function
module.exports = webtask.fromExpress(app);
