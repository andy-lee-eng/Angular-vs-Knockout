'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
    beforeEach(module('testSPA.controllers'));
    beforeEach(module('testSPA.services'));

    describe('home controller', function () {
        it('should store search model object', inject(function ($controller, searchModel) {
            //spec body
            var scope = {};
            var homeCtrl = $controller('HomeCtrl', { $scope: scope });
            
            expect(scope.search).toBeDefined();
            expect(scope.search.name).toEqual('');

            // Change the filter name
            searchModel.name = 'new-filter';
            expect(scope.search.name).toEqual('new-filter');
        }));
    });

});
