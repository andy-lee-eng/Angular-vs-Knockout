'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('my app', function() {

  browser.get('/');

  it('should automatically redirect to /home when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/home");
  });


  describe('home', function() {

    beforeEach(function() {
      browser.get('/#/home');
    });


    it('should render home when user navigates to /home', function() {
        expect(element.all(by.css('investments-component .panel-heading h3')).first().getText()).
        toMatch(/Investments/);
    });

  });


  describe('about', function() {

    beforeEach(function() {
      browser.get('/#/about');
    });


    it('should render about when user navigates to /about', function () {
      expect(element.all(by.css('.panel-heading h2')).first().getText()).
        toMatch(/About/);
    });

  });
});
