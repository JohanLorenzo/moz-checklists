'use strict';

var fs = require('fs');
var Promise = require('promise');

var localFolder = 'var/git';
var git = require('simple-git')(localFolder)

var remoteRepoUrl = 'http://localhost:10080/johan/moztrap-replacement-repo.git';

var _branch = 'master';

var _initializeRepo = function() {
  return new Promise(function(fulfill, reject) {
    fs.exists(localFolder, function(exists) {
      if (exists) {
        fulfill();
      } else {
        git.clone(clone(remoteRepoUrl, localFolder)).then(fulfill);
      }
    });
  })
}

var self = module.exports = {

  update: function() {
    return _initializeRepo()
    .then(function() {
      return git.pull()
    })
  },

  getCurrentBranch: function() {
    return _branch;
  },

  getFileContent: function(path) {
    return new Promise(function(fulfill, reject) {
      return self.update().then(function() {
        fs.readFile(localFolder + '/' + path, { encoding: 'utf8' }, function(err, data) {
          fulfill(data);
        })
      })
    })
  }
};
