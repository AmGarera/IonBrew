angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('Homepage', {
        url: "/Homepage",
        templateUrl: "templates/home.html",
        controller: "homeCtrl"
    })
    .state('Beer', {
        url: "/Beer",
        templateUrl: "templates/beer.html",
        controller: "beerCtrl"
    })
    .state("Brewery", {
      url: "/Brewery",
      templateUrl: "templates/brewery.html",
      controller: "breweryCtrl"
    })
    .state("Settings", {
      url: "/Settings",
      templateUrl: "templates/settings.html",
      controller: "settingsCtrl"
    })
    .state("DamGap", {
      url: "/DamGap",
      templateUrl: "templates/damgap.html",
      controller: "damgapCtrl"
    })
    .state("Favorites", {
      url: "/Favorites",
      templateUrl: "templates/favorites.html",
      controller: "favoriteCtrl"
    });

  $urlRouterProvider.otherwise('/Homepage')

});
