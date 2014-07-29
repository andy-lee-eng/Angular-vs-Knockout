(function ($) {
    function SVGBarChart(element, options) {
        var data = [];
        var settings = $.extend({
            category: 'name',
            series: ['value'],
            margins: {
                top: 10,
                bottom: 20,
                left: 120,
                right: 20
            },
            barSize: 20,
            barPadding: 3,
            barGap: 1,
            duration: 400
        }, options);

        // SVG chart elements
        var containerElement = d3.select(element);
        var svgElement = containerElement.append('svg').attr('class', 'chart bar-chart');
        var plotElement = svgElement.append('g').attr('class', 'plot');
        var xAxisElement = plotElement.append('g').attr('class', 'axis x-axis');
        var yAxisElement = plotElement.append('g').attr('class', 'axis y-axis');

        var xScale = d3.scale.linear();
        var yScale = d3.scale.ordinal();

        var chartSize = {};

        this.setData = function setData(newData) {
            if (!newData) return;
            data = newData;

            data.sort(function (d1, d2) {
                var total = function (d) { return d3.sum(settings.series.map(function (s) { return d[s]; })); };
                return total(d1) - total(d2);
            });

            renderChart(true);
        };

        this.resized = function () {
            renderChart(false);
        };

        var firstRender = true;
        var renderChart = function renderChart(animate) {
            var renderDuration = (data.length > 0 && animate) ? settings.duration : 0;
            var axesDuration = firstRender ? 0 : renderDuration;

            positionChartElements(axesDuration);

            if (!firstRender || data.length > 0) {
                drawAxes(axesDuration);
                drawBars(renderDuration);

                firstRender = false;
            }
        };

        var drawAxes = function drawAxes(renderDuration) {
            // Linear range for bar size
            xScale.domain([
                    Math.min(0, d3.min(data, function (d) { return d3.min(settings.series.map(function (s) { return d[s]; })); })),
                    Math.max(0, d3.max(data, function (d) { return d3.max(settings.series.map(function (s) { return d[s]; })); }))
            ])
                .range([0, chartSize.plot.width]);

            // Ordinal range for categories
            yScale.domain(data.map(function (p) { return p[settings.category]; }))
                .rangeRoundBands([0, -(chartSize.plot.height)]);

            var xAxis = d3.svg.axis()
                .scale(xScale)
                .ticks((chartSize.plot.width) / 100)
                .tickSize(5)
                .orient("bottom")
                .tickSubdivide(true);

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .tickSize(5)
                .orient("left");

            xAxisElement.transition().duration(renderDuration).call(xAxis);
            yAxisElement.transition().duration(renderDuration).call(yAxis);
        };

        var drawBars = function drawBars(renderDuration) {
            var barContainers = plotElement.selectAll('.bar-container')
                .data(data, function (d) { return d[settings.category]; });

            barContainers.enter().append('g')
                .attr("class", "bar-container")
                .attr("transform", function (d) { return 'translate(0,' + yScale(d[settings.category]) + ')'; });
            barContainers.exit().remove();

            barContainers.transition().duration(renderDuration)
                .attr("transform", function (d) { return 'translate(0,' + yScale(d[settings.category]) + ')'; });

            var bars = barContainers.selectAll('.bar')
                .data(function (d) { return settings.series.map(function (s) { return d[s]; }); });

            var containerHeight = yScale.rangeBand();
            var barHeight = (containerHeight - 2 * settings.barPadding) / settings.series.length - settings.barGap;
            bars.enter().append('rect')
                .attr("class", function (d, i) { return "bar series-" + i; })
                .attr("x", 0).attr("width", 0)
                .attr("y", function (d, i) { return settings.barPadding + i * (barHeight + settings.barGap); }).attr("height", barHeight);

            bars.transition().duration(renderDuration)
                .attr("width", function (d) { return xScale(d); })
                .attr("y", function (d, i) { return settings.barPadding + i * (barHeight + settings.barGap); }).attr("height", barHeight);

        };

        var positionChartElements = function positionChartElements(renderDuration) {
            measureChartSize();

            svgElement
                .style('width', chartSize.width + "px")
                .transition().duration(renderDuration)
                .style('height', chartSize.height + "px");

            plotElement
                .transition().duration(renderDuration)
                .attr('transform', 'translate(' + settings.margins.left + ', ' + (chartSize.height - settings.margins.bottom) + ')')
        };

        var measureChartSize = function measureChartSize() {
            chartSize = {
                width: parseInt(containerElement.style('width')),
                height: data.length * (settings.series.length * (settings.barSize + settings.barGap) + settings.barPadding)
                        + settings.margins.top + settings.margins.bottom
            };

            chartSize.plot = {
                width: chartSize.width - settings.margins.left - settings.margins.right,
                height: chartSize.height - settings.margins.bottom - settings.margins.top
            };
        };
    };

    window.testSPA = window.testSPA || {};
    window.testSPA.SVGBarChart = SVGBarChart;

})(jQuery);
