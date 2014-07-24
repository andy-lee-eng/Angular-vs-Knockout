'use strict';

/* Directives */


angular.module('testSPA.directives', [])
  .directive('chart', [function() {
    var link = function link(scope, element, attrs) {

        var options = attrs.options ? scope[attrs.options] : {};
        var ChartType = 
            attrs.chart === "bar" ? window.testSPA.SVGBarChart
            : attrs.chart === "column" ? window.testSPA.SVGColumnChart
            : null;
        if (!ChartType) throw "Invalid chart type '" + attrs.chart + "'";

        // Create the chart object bound to the element
        var chart = new ChartType(element[0], options);

        scope.$watch(attrs.data, function (value) {
            chart.setData(scope[attrs.data]);
        });

        // Handle resizing
        var resize = function () {
            chart.resized();
        };

        $(window).bind("resize", resize);
        element.on('$destroy', function () {
            $(window).unbind("resize", resize);
        });

    };

    return {
        link: link
    };
  }]);
