'use strict';

angular.module('mozChecklistsApp')
  .controller('RunCtrl', function ($scope, $http, socket, $stateParams) {
    var id = $stateParams.runId;
    var apiUrl = '/api/runs/' + id;

    $http.get(apiUrl).success(function(run) {
      $scope.run = run;
      $scope.run.checksRun.forEach(function(checkRun) {
          $http.get('/api/checks/' + checkRun.checkId + '/' + $scope.run.latestCommitOnBranch)
            .success(function(check) {
              _.merge(checkRun, check);
            })
        })
      socket.syncUpdates('run', [$scope.run], onSocketSyncUpdates);
    });

    $scope.setResult = function(check, result) {
      var index = $scope.run.checksRun.indexOf(check);
      $scope.run.checksRun[index].status = result

      $http.put(apiUrl, $scope.run);
    };

    var onSocketSyncUpdates = function(event, object, item) {
      console.log(object);
      // TODO warn the user instead
      if (object._id === $scope.run._id) {
        _.merge($scope.run, object);
      }
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('run');
    });
  });
