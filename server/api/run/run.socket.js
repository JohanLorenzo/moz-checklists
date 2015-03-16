/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Run = require('./run.model');

exports.register = function(socket) {
  Run.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Run.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('run:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('run:remove', doc);
}
