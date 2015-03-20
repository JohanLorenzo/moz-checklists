'use strict';

angular.module('mozChecklistsApp')
  .controller('ChartsCtrl', function ($scope, $http) {

    var dataKeys = 'pending passed failed invalid skipped'.split(' ');
    var colors = 'grey green red orange silver'.split(' ');
    $scope.chartSchema = initializeSchema();
    $scope.chartData = [];
    $scope.chartOptions = initializeOptions(dataKeys, colors);

    // TODO: Remove the URL hack
    $http.get('/api/runs/restrained').success(function(runs) {
      $scope.runs = runs;
      transformRunsIntoDataset();
    });

    function transformRunsIntoDataset() {
      var array = [];

      $scope.runs.forEach(function(run) {
        var data = { startedOn: new Date(run.startedOn) }

        run.checksRun.forEach(function(checkRun) {
          if (typeof data[checkRun.status] === 'undefined') {
            data[checkRun.status] = 1
          } else {
            data[checkRun.status]++
          }
        })

        array.push(data);
      })
      $scope.chartData = array;
    }

    function initializeSchema() {
      return {
        startedOn: {
          type: 'datetime'
        }
      };
    };

    function initializeOptions(dataKeys, colors) {
      var options = {
        rows: [],
        xAxis: {
          key: 'startedOn',
          displayFormat: '%Y-%m-%d %H:%M:%S'
        },
        yAxis: {
          label: 'Checks run'
        },
        groups: [[]]
      };
      for (var i = 0; i < dataKeys.length; i++) {
        options.rows.push({ key: dataKeys[i], color: colors[i], type: 'bar' })
        options.groups[0].push(dataKeys[i]);
      }
      return options;
    };
  });
