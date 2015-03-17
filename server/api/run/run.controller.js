'use strict';

var _ = require('lodash');
var Run = require('./run.model');
var repo = require('../../git/local-repo');

// Get list of runs
exports.index = function(req, res) {
  Run.find(function (err, runs) {
    if(err) { return handleError(res, err); }
    return res.json(200, runs);
  });
};

// Get a single run
exports.show = function(req, res) {
  Run.findById(req.params.id, function (err, run) {
    if(err) { return handleError(res, err); }
    if(!run) { return res.send(404); }
    return res.json(run);
  });
};

// Creates a new run in the DB.
exports.create = function(req, res) {
  var data = req.body;
  data.createdBy = req.user.email;

  // Add latest commit
  repo.getLatestCommitSha1().then(function(sha1) {
    data.latestCommitOnBranch = sha1;

    Run.create(req.body, function(err, run) {
      if(err) { return handleError(res, err); }
      return res.json(201, run);
    });
  });
};

// Updates an existing run in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Run.findById(req.params.id, function (err, run) {
    if (err) { return handleError(res, err); }
    if(!run) { return res.send(404); }

    if (req.body.checksRun) {
      req.body.checksRun.forEach(function(checkRun) {
        if (checkRun.status !== 'pending' && checkRun.executedOn !== new Date(0)) {
          checkRun.executedOn = new Date();
          checkRun.executedBy = req.user.email;
        }
      });
    }

    var updated = _.extend(run, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, run);
    });
  });
};

// Deletes a run from the DB.
exports.destroy = function(req, res) {
  Run.findById(req.params.id, function (err, run) {
    if(err) { return handleError(res, err); }
    if(!run) { return res.send(404); }
    run.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
