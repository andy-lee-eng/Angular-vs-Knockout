define(['components/home-page/home', 'app/search-model'], function (homePage, searchModel) {
  var HomePageViewModel = homePage.viewModel;

  describe('home page view model', function() {
    beforeEach(function () { searchModel.name(''); });

    it('should store search model object', function() {
        var instance = new HomePageViewModel();
        expect(instance.search.name()).toEqual('');

        // Change the filter name
        searchModel.name('new-filter');
        expect(instance.search.name()).toEqual('new-filter');
    });

  });

});
