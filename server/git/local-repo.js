'use strict';

var fs = require('fs');
var Promise = require('promise');
var NodeGit = require("nodegit");
var mkdirp = require('mkdirp');

// TODO Export these values in a config file
var localFolder = 'var/git';
var remoteRepoUrl = 'https://github.com/JohanLorenzo/checklists-repo-example.git';

var _branch = 'master';
var _repo = null;

var _initializeRepo = function() {
  return new Promise(function(fulfill, reject) {
    fs.exists(localFolder, function(exists) {
      if (exists) {
        NodeGit.Repository.open(localFolder).then(function (repo) {
          _repo = repo;
          fulfill();
        });
      } else {
        mkdirp(localFolder, function (err) {
            if (err) console.error(err);
            NodeGit.Clone.clone(remoteRepoUrl, localFolder, null).then(function(repo) {
              _repo = repo;
              fulfill();
            })
        });

      }
    });
  })
}

var _getFileContentAtRevision = function(path, revision) {
  return _repo.getCommit(revision)
    .then(function(commit) {
      return commit.getEntry(path);
    })
    .then(function(entry){
      return entry.getBlob().then(function(blob) {
        return String(blob);
      });
    })
}

var self = module.exports = {

  update: function() {
    // Open a repository that needs to be fetched and fast-forwarded
    return new Promise(function(fulfill, reject) {
      fulfill(_repo.fetchAll({}));
    })
    // TODO: Async forEach
    .then(function() {
      return _repo.mergeBranches("master", "origin/master");
    });
  },

  getCurrentBranch: function() {
    return _branch;
  },

  getFileContent: function(path, revision) {
    if (typeof revision === 'undefined') {
      return self.update()
      .then(function() {
          return self.getLatestCommitSha1()
      }).then(function(head) {
        return _getFileContentAtRevision(path, head);
      })
    } else {
      return _getFileContentAtRevision(path, revision);
    }
  },

  getLatestCommitSha1: function(branch) {
    if (typeof branch === 'undefined') {
      return NodeGit.Reference.nameToId(_repo, 'refs/heads/master');
    } else {
      return NodeGit.Reference.nameToId(_repo, 'refs/heads/' + branch);
    }
  }
};

_initializeRepo();
