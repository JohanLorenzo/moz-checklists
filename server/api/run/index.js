'use strict';

var express = require('express');
var controller = require('./run.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
// TODO: Remove this magical hack *Yikes*
router.get('/restrained', controller.restrainedIndex);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
