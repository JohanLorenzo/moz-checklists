'use strict';

var marked = require('marked');
var repo = require('../../git/local-repo')

// Get list of checksuites
exports.index = function(req, res) {
  repo.getFileContent('README.md').then(function(text){
    var checksuites = [];

    var lexer = new marked.Lexer();
    var tokens = lexer.lex(text);

    tokens.forEach(function(token) {
      if (token.depth == 2) {
        checksuites.push(token.text);
      }
    });

    return res.json(200, checksuites);
  })
};

function handleError(res, err) {
  return res.send(500, err);
}
