Angular-vs-Knockout
===================

An implementation of the same SPA in both AngularJS and KnockoutJS (with CrossroadsJS and RequireJS)

The accompanying blog post is here:
[Single Page Applications - Angular vs Knockout](http://www.scottlogic.com/blog/2014/07/30/spa-angular-knockout.html)

###Introduction
The Angular version was built up from the angular-seed project, which is here: https://github.com/angular/angular-seed

The Knockout version was scaffolded using yeoman, and includes CrossroadsJS and RequireJS.

A live demo of both apps is available here:

[Knockout Version](https://rawgit.com/DevAndyLee/Angular-vs-Knockout/master/Dist/Knockout/index.html)

[Angular Version](https://rawgit.com/DevAndyLee/Angular-vs-Knockout/master/Dist/Angular/index.html)

The app presents a list of investments in a portfolio, and lets you filter them by name while dynamically updating all the components.
You can also click through view details of each investment or view the about page, all within the same SPA.

Html, javascript and css is packaged up and minified for the app home screen, while navigating to additional screens triggers a request for the additional content.

Both apps have a mocked back end, so that they behave as though they're making ajax requests without actually needing a server to respond to those requests.


###Installation:

From both the AngularFrontEnd and KnockoutFrontEnd folders:
```
npm install
```

###Start the web servers:

Use the node http server to host the content locally:
```
call http-server AngularFrontEnd\app –p 8082 -o -c-1
call http-server KnockoutFrontEnd\src –p 8081 -o -c-1
```

###Build and optimise:

From both the AngularFrontEnd and KnockoutFrontEnd folders:
```
gulp
```

Gulp creates a /dist folder containing the compiled and optimised version of the site.
