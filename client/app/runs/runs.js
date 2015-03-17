'use strict';

angular.module('mozChecklistsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('runs', {
        url: '/runs',
        templateUrl: 'app/runs/list/runs.html',
        controller: 'RunsCtrl'
      })
      .state('run', {
        url: '/runs/:runId',
        templateUrl: 'app/runs/one/run.html',
        controller: 'RunCtrl'
      });
  });
