define(["knockout", "svg-bar-chart", "svg-column-chart", "d3"], function (ko, SVGBarChart, SVGColumnChart) {

    var createBinding = function (SVGChart) {
        var binding = {};
        binding.init = function (element, valueAccessor, allBindingsAccessor) {
            var options = allBindingsAccessor().chartOptions || {};

            // Create the chart object bound to the element
            $(element).data('chart', new SVGChart(element, options));
            binding.update(element, valueAccessor);

            // Handle resizing
            var resize = function () {
                $(element).data('chart').resized();
            };

            $(window).bind("resize", resize);
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(window).unbind("resize", resize);
            });
        };
        binding.update = function (element, valueAccessor) {
            // Update the chart data
            var data = ko.unwrap(valueAccessor());
            $(element).data('chart').setData(data);
        };

        return binding;
    };

    ko.bindingHandlers.barChart = createBinding(SVGBarChart);
    ko.bindingHandlers.columnChart = createBinding(SVGColumnChart);
});
