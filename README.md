Angular-vs-Knockout
===================

An implementation of the same SPA in both AngularJS and KnockoutJS (with CrossroadsJS and RequireJS)

###Introduction
The Angular version was built up from the angular-seed project, which is here: https://github.com/angular/angular-seed

The Knockout version was scaffolded using yeoman, and includes CrossroadsJS and RequireJS.


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
