'use strict';

describe('Controller: ChartsCtrl', function () {

  // load the controller's module
  beforeEach(module('mozChecklistsApp'));

  var ChartsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChartsCtrl = $controller('ChartsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
