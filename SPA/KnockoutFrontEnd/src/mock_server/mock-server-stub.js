define(["jquery", "mock-server", "jquery-mockjax"], function ($, mockServer) {

    $.mockjax({
        url: 'http://localhost:54361/analysis',
        responseTime: 30, response: function (settings) {
            this.responseText = mockServer.analysis(settings.data.name);
        }
    });

    $.mockjax({
        url: 'http://localhost:54361/getSectors',
        responseTime: 30, response: function (settings) {
            this.responseText = mockServer.getSectors(settings.data.name);
        }
    });

    $.mockjax({
        url: 'http://localhost:54361/getTransactions',
        responseTime: 30, response: function (settings) {
            this.responseText = mockServer.getTransactions(settings.data.name);
        }
    });

    $.mockjax({
        url: 'http://localhost:54361/getInvestment',
        responseTime: 30, response: function (settings) {
            this.responseText = mockServer.getInvestment(parseInt(settings.data.id));
        }
    });


});
