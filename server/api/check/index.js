'use strict';

var express = require('express');
var controller = require('./check.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/:revision', controller.showAtGivenRevision);

module.exports = router;
