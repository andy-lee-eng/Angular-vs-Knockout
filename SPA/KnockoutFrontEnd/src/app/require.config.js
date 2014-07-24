// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "knockout":             "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "text":                 "bower_modules/requirejs-text/text",
        "globalize":            "bower_modules/globalize/lib/globalize",
        "globalize-en":         "bower_modules/globalize/lib/cultures/globalize.culture.en-GB",
        "d3":                   "bower_modules/d3/d3",
        "jquery-mockjax":       "bower_modules/jquery-mockjax/jquery.mockjax",
        "mock-server":          "mock_server/mock-server",
        "server-stub":          "mock_server/mock-server-stub",
        "svg-bar-chart":        "charts/svg-bar-chart",
        "svg-column-chart":     "charts/svg-column-chart"
    },
    shim: {
        "bootstrap":            { deps: ["jquery"] },
        "globalize":            { deps: ["jquery"], exports: 'window.Globalize' },
        "globalize-en":         { deps: ["globalize"] },
        "d3":                   { exports: 'window.d3' },
        "jquery-mockjax":       { deps: ["jquery"] },
        "mock-server":          { exports: 'window.testSPA.mockServer' },
        "svg-bar-chart":        { exports: 'window.testSPA.SVGBarChart' },
        "svg-column-chart":     { exports: 'window.testSPA.SVGColumnChart' }
    }
};
