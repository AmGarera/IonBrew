angular.module('app.controllers', [])


  .controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {
      console.log("Inside Home Controller");


    }])

  .controller('beerCtrl', ["$scope", "BeerFactory", "BeerService", "TestingFactory",// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, BeerFactory, BeerService, TestingFactory) {
      console.log("Inside Beer Controller");

      // function getBeers() {
      //   TestingFactory.getBeer($scope.beerNameSearch)
      //     .then(function (response) {
      //       $scope.beer = response.data;
      //       console.log(response.data.data);
      //     }, function (error) {
      //       $scope.status = "Unable to Load " + error.message;
      //       }
      //     )
      //
      // }

      // //Test function to make sure its calling the data from the textbox
      // $scope.testFunction = function () {
      //   console.log("Test Message");
      //   console.log($scope.beerNameSearch)
      // };
      //
      //Calls beer service and passes in the data from the textbox
      $scope.fetchBeer = function () {
        $scope.beerNameSearch;
        console.log("BeerNameSearch = "  + $scope.beerNameSearch);

        getBeers();

        function getBeers() {
          TestingFactory.getBeer($scope.beerNameSearch)
            .then(function (response) {
                $scope.beer = response.data;
                console.log(response.data.data);
              }, function (error) {
                $scope.status = "Unable to Load " + error.message;
              }
            )

        }
      };
      // $scope.fetchBeer = function () {
      //   console.log("fetchBeer called")
      //   BeerService.getBeer($scope.beerNameSearch,
      //     function(data) {
      //     console.log("BeerService.getBeer Called");
      //       console.log(data);
      //       $scope.beer = data;
      //       console.log($scope.beer);
      //   })
      // };

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
