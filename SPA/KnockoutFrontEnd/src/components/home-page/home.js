define(["knockout", "text!./home.html", "app/search-model"], function (ko, homeTemplate, searchModel) {

  function HomeViewModel(route) {
      this.search = searchModel;
  }

  return { viewModel: HomeViewModel, template: homeTemplate };
});
