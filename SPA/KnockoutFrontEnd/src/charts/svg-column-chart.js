(function ($) {
    function SVGColumnChart(element, options) {
        var data = [];
        var settings = $.extend({
            x: 'x',
            y: 'y',
            classFn: function (d) { return ""; },
            margins: {
                top: 10,
                bottom: 10,
                left: 120,
                right: 20
            },
            barSize: 5,
            duration: 400
        }, options);

        // SVG chart elements
        var containerElement = d3.select(element);
        var svgElement = containerElement.append('svg').attr('class', 'chart column-chart');
        var plotElement = svgElement.append('g').attr('class', 'plot');
        var xAxisElement = plotElement.append('g').attr('class', 'axis x-axis');
        var yAxisElement = plotElement.append('g').attr('class', 'axis y-axis');

        var xScale = d3.time.scale();
        var yScale = d3.scale.linear();

        var chartSize = {};

        var getX = function (d) {
            return new Date(Date.parse(d[settings.x]));
        };
        var getY = function (d) {
            return d[settings.y];
        };

        this.setData = function setData(newData) {
            if (!newData) return;
            data = newData;

            data.sort(function (d1, d2) {
                return getX(d1) - getX(d2);
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
                drawColumns(renderDuration);

                firstRender = false;
            }
        };

        var drawAxes = function drawAxes(renderDuration) {
            // Date range for x axis
            xScale.domain(d3.extent(data, getX))
                .range([0, chartSize.plot.width]);
            // Linear range for y axis
            yScale.domain([
                    Math.min(0, d3.min(data, getY)),
                    Math.max(0, d3.max(data, getY))
            ])
                .range([0, -(chartSize.plot.height)]);

            var xAxis = d3.svg.axis()
                .scale(xScale)
                .ticks((chartSize.plot.width) / 100)
                .tickSize(5)
                .orient("bottom")
                .tickSubdivide(true);

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .ticks((chartSize.plot.height) / 50)
                .tickSize(5)
                .orient("left");

            xAxisElement.transition().duration(renderDuration)
                .attr("transform", "translate(0," + yScale(0) + ")")
                .call(xAxis);

            yAxisElement.transition().duration(renderDuration).call(yAxis);
        };

        var drawColumns = function drawColumns(renderDuration) {
            var columns = plotElement.selectAll('.column')
                .data(data, getX);

            columns.enter().append('rect')
                .attr("class", function (d, i) { return "column " + settings.classFn(d); })
                .attr("x", function (d) { return xScale(getX(d)) - settings.barSize / 2; })
                .attr("width", settings.barSize)
                .attr("y", yScale(0)).attr("height", 0);
            columns.exit().remove();

            columns.transition().duration(renderDuration)
                .attr("x", function (d) { return xScale(getX(d)) - settings.barSize / 2; })
                .attr("y", function (d) { return yScale(getY(d) > 0 ? getY(d) : 0); })
                .attr("height", function (d) { return Math.abs(yScale(0) - yScale(getY(d))); })
        };

        var positionChartElements = function positionChartElements(renderDuration) {
            measureChartSize();

            svgElement
                .style('width', chartSize.width + "px")
                .style('height', chartSize.height + "px");

            plotElement
                .transition().duration(renderDuration)
                .attr('transform', 'translate(' + settings.margins.left + ', ' + (chartSize.height - settings.margins.bottom) + ')')
        };

        var measureChartSize = function measureChartSize() {
            chartSize = {
                width: parseInt(containerElement.style('width')),
                height: parseInt(containerElement.style('height'))
            };

            chartSize.plot = {
                width: chartSize.width - settings.margins.left - settings.margins.right,
                height: chartSize.height - settings.margins.bottom - settings.margins.top
            };
        };
    };

    window.testSPA = window.testSPA || {};
    window.testSPA.SVGColumnChart = SVGColumnChart;

})(jQuery);
