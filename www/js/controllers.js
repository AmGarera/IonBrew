angular.module('app.controllers', [])


  .controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {
      console.log("Inside Home Controller");


    }])

  .controller('beerCtrl', ["$scope", "BeerFactory", "BeerService", "TestingFactory", "$ionicLoading", "$ionicModal",// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, BeerFactory, BeerService, TestingFactory, $ionicLoading, $ionicModal) {
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
        type = 'beer';

        $ionicLoading.show({
          template: '<ion-spinner icon="android"></ion-spinner>',
          // animation: 'fade-in',
          showBackdrop: true
          // maxWidth: 500
          // showDelay: 100
        });

        getBeers();

        function getBeers() {
          $scope.beer = {};
          TestingFactory.getBrews($scope.beerNameSearch, type)
            .then( function (response) {
              $scope.beer = response.data.data;
              $ionicLoading.hide();
              var beerData= response.data.data;
              console.log($scope.beerNameSearch)
                console.log($scope.beer);
                console.log($scope.beer.id);
                // onBeer(beerData)
              }, function (error) {
                $scope.status = "Unable to Load " + error.message;
              }
            )

        }
      };

      $ionicModal.fromTemplateUrl('single-beer.html', {
        scope: $scope,
        animation: 'slide-in-up',
        hardwareBackButtonClose: true

      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function (id) {
        $ionicLoading.show({
          template: '<ion-spinner icon="android"></ion-spinner>',
          // animation: 'fade-in',
          showBackdrop: true
          // maxWidth: 500
          // showDelay: 100
        });

        var type = "beer";
        console.log("Model Open");
        console.log(id);
        console.log(type);

        getSingle();

        function getSingle() {
          $scope.single = {};
          TestingFactory.getSingleBrew(id, type)
            .then( function (response) {
              var single = response.data.data;
                $scope.singlebeer = response.data.data;
                console.log(single);
                $ionicLoading.hide();
            }
            , function (error) {
            $scope.status = "Unable to Load " + error.message;
          })
        }
        $scope.modal.show();
      };
      $scope.closeModal = function () {
        console.log("Model Hidden")
        $scope.modal.hide();
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });
      // Execute action on hide modal
      $scope.$on('modal.hidden', function () {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modal.removed', function () {
        // Execute action
      })


    }])

  .controller('breweryCtrl', ['$scope', '$stateParams', "TestingFactory", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, TestingFactory) {

      console.log("Inside Brewery Controller");

      $scope.fetchBrews = function () {
        $scope.brewNameSearch;
        console.log("BrewNameSearch = "  + $scope.brewNameSearch);

        getBeers();

        function getBeers() {
          type = 'brewery';
          $scope.brew = {};
          TestingFactory.getBrews($scope.brewNameSearch, type)

            .then( function (response) {
                $scope.brew = response.data.data;
                var brewData= response.data.data;
                console.log($scope.brew);
              }, function (error) {
                $scope.status = "Unable to Load " + error.message;
              }
            )

        }
      };


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

    }]);
