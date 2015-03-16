'use strict';

angular.module('mozChecklistsApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.checks = [];

    $http.get('/api/checks').success(function(checks) {
      $scope.checks = checks;
    });
  });
