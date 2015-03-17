'use strict';

describe('Controller: RunsCtrl', function () {

  // load the controller's module
  beforeEach(module('mozChecklistsApp'));

  var RunsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RunsCtrl = $controller('RunsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
