angular.module('app.controllers', [])


  .controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {
      console.log("Inside Home Controller");


    }])

  .controller('beerCtrl', ["$scope",// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, BeerService) {
      console.log("Inside Beer Controller");

      $scope.message = "Beer Tab";
      $scope.beerName = "" ;
      console.log($scope.beerName);

      $scope.testFunction = function () {
        console.log("Test Message");
        console.log($scope.beerName)
      };

      $scope.fetchBeer = function () {
        console.log("fetchBeer called");
        console.log($scope.beerName);
        BeerService.getBeer($scope.beerName)
          .then(onBeer (response), onError)
        $scope.beerResults = response.data;
      };

      var onBeer = function (data) {
          $scope.beer = data
      };

      var onError = function (reason) {
        $scope.beerName = "Could not fetch beers"
      }


    }])

  .controller('breweryCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

      console.log("Inside Brewery Controller");


    }])

  .controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {
      console.log("Inside Settings Controller");


    }])

  .controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])
