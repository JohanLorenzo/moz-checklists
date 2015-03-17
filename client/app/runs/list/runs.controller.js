'use strict';

angular.module('mozChecklistsApp')
  .controller('RunsCtrl', function ($scope, $http, socket) {

    $scope.selectedChecks = [];

    $http.get('/api/runs').success(function(runs) {
      $scope.runs = runs;
      socket.syncUpdates('run', $scope.runs);
    });

    $scope.changeOnSelected = function(check) {
      if (check.isSelected === true) {
        $scope.selectedChecks.push({checkId: check.id})
      } else {
        _.remove($scope.selectedChecks, {checkId: check.id});
      }
    };

    $scope.add = function() {
      if($scope.selectedChecks.length === 0) {
        return;
      }
      $http.post('/api/runs',
        {
          branch: $scope.branch,
          buildId: $scope.buildId,
          checksRun: $scope.selectedChecks,
        }).success(function() { $scope.clearForm() });
    };

    $scope.remove = function(run) {
      $http.delete('/api/runs/' + run._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('run');
    });

    $scope.clearForm = function() {
      $scope.branch = '';
      $scope.buildId = '';
      $scope.selectedChecks = [];
    };
  });
