'use strict';

angular.module('testSPA.mockServer', [])
    .service('backEndServer', ["$q", function ($q) {

        var promise = function (callFn) {
            var deferred = $q.defer();
            setTimeout(function () { deferred.resolve(callFn()); }, 30);

            return deferred.promise;
        };

        this.analysis = function (params) {
            return promise(function () {
                return window.testSPA.mockServer.analysis(params.name);
            });
        };

        this.getSectors = function (params) {
            return promise(function () {
                return window.testSPA.mockServer.getSectors(params.name);
            });
        };

        this.getTransactions = function (params) {
            return promise(function () {
                return window.testSPA.mockServer.getTransactions(params.name);
            });
        };

        this.getInvestment = function (params) {
            return promise(function () {
                return window.testSPA.mockServer.getInvestment(parseInt(params.id));
            });
        };
    }]);
