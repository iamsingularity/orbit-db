'use strict';

const OpTypes     = require('./OpTypes');
const OrbitDBItem = require('../post/OrbitDBItem');
const Post        = require('../post/Post');

class Operation {
  static create(ipfs, log, user, operation, key, value, data) {
    return new Promise((resolve, reject) => {
      let post;
      Operation._createOperation(ipfs, user, operation, key, value)
        .then((op) => {
          post = op.Post;
          // console.log(op)
          return log.add(op.Hash);
        })
        .then((node) => resolve({ node: node, op: post }))
        .catch(reject);
    });
  }

  static _createOperation(ipfs, user, operation, key, value) {
    return new Promise((resolve, reject) => {
      const data = {
        operation: operation,
        key: key,
        value: value,
        by: user.id || 'empty'
      };
      Post.create(ipfs, Post.Types.OrbitDBItem, data)
        .then(resolve)
        .catch(reject);
    });
  }

  static get Types() {
    return OpTypes;
  }
}

module.exports = Operation;
