angular.module('app.controllers', ['ngStorage', 'indexedDB'])

  .controller('homeCtrl', ['$scope', '$stateParams', 'TestingFactory',"GeolocationService",// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, TestingFactory, geolocation) {
      console.log("Inside Home Controller");

      $scope.position = null;
      $scope.message = "Determining gelocation...";

      geolocation().then(function (position) {
        $scope.position = position;
        console.log($scope.position)
      }, function (reason) {
        $scope.message = "Could not be determined."
      });
    }])

  .controller('beerCtrl', ["$scope", "BeerFactory", "BeerService", "TestingFactory", "$ionicLoading", "$ionicModal", "$indexedDB",
    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, BeerFactory, BeerService, TestingFactory, $ionicLoading, $ionicModal, $indexedDB) {
      console.log("Inside Beer Controller");

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
              // console.log($scope.beer);
              $ionicLoading.hide();
              var beerData= response.data.data;
              console.log($scope.beerNameSearch)
                console.log($scope.beer);
                console.log($scope.beer.id);
                // onBeer(beerData)
              console.log("beerData" + beerData);

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

      // $scope.saveFavorite = function (id, name) {
      //   console.log("Inside saveFavorites Function");
      //   console.log("DrinkID = "  + id);
      //   console.log("DrinkName = "  + name);
      //
      //   $indexedDB.openStore('favorites', function(store){
      //     // single item
      //     store.insert({"drinkID": id, "drinkName": name}).then(function (e) {
      //       // do something
      //     });
      //   });
      //
      //   // $localStorage.savedDrinks = [
      //   //   {
      //   //     name: name,
      //   //     id: id
      //   //   }
      //   // ];
      //
      // }


    }])

  .controller('breweryCtrl', ['$scope', '$stateParams', "$ionicLoading", "$ionicModal", "TestingFactory", "GeolocationService",
    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $ionicLoading, $ionicModal, TestingFactory, geolocation) {

      console.log("Inside Brewery Controller");

      $scope.position = null;
      $scope.message = "Determining gelocation...";

      geolocation().then(function (position) {
        $scope.position = position;
        console.log($scope.position);

        TestingFactory.getNearby($scope.position.coords.latitude, $scope.position.coords.longitude)
          .then( function (response) {
            $scope.location = response.data.data;
            console.log($scope.location)
          });
      }, function (reason) {
        $scope.message = "Could not be determined."
      });


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

      $ionicModal.fromTemplateUrl('single-brew.html', {
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

        var type = 'brewery';
        console.log("Model Open");
        console.log(id);
        console.log(type);

        getSingle();

        function getSingle() {
          $scope.single = {};
          TestingFactory.getSingleBrew(id, type)
            .then( function (response) {
                var single = response.data.data;
                $scope.singlebrew = response.data.data;
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

  .controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {
      console.log("Inside Settings Controller");


    }])

  .controller('damgapCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('favoriteCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('SuggestionsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }]);
