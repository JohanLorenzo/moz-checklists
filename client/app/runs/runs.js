'use strict';

angular.module('mozChecklistsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('runs', {
        url: '/runs',
        templateUrl: 'app/runs/list/runs.html',
        controller: 'RunsCtrl'
      });
  });
