angular.module('app.controllers', [])


  .controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {
      console.log("Inside Home Controller");


    }])

  .controller('beerCtrl', ["$scope", "BeerFactory",// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, BeerFactory) {
      console.log("Inside Beer Controller");

      $scope.message = "Beer Tab";
      $scope.beerName = "" ;
      console.log($scope.beerNameSearch);

      //Test function to make sure its calling the data from the textbox
      $scope.testFunction = function () {
        console.log("Test Message");
        console.log($scope.beerNameSearch)
      };

      //Calls beer service and passes in the data from the textbox
      $scope.fetchBeer = function () {
        console.log("fetchBeer called");
        console.log($scope.beerNameSearch);
        $scope.beer = BeerFactory.getBeer($scope.beerNameSearch)
          // .then(onBeer (data), onError)
        console.log($scope.beer);
      };
      //Successful beer fetching
      var onBeer = function (data) {
          $scope.beer = data
      };
      //Error that is thrown if beers couldn't be fetched.
      var onError = function (reason) {
        $scope.beerNameSearch = "Could not fetch beers"
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
