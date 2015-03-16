'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var status = 'pending passed failed invalid skipped'.split(' ');

var checkRun = new Schema({
  checkId: String,
  status: { type: String, enum: status, default: 'pending' },
  executedBy: { type: String, default: ''},
  executedOn: { type: Date, default: new Date(0) }
});

var RunSchema = new Schema({
  branch: String,
  buildId: String,
  startedOn: { type: Date, default: Date.now },
  endedOn: { type: Date, default: new Date(0) },
  createdBy: String,
  checksRun: [checkRun]
});

module.exports = mongoose.model('Run', RunSchema);
