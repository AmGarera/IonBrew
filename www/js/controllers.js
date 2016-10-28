angular.module('app.controllers', ['ionic', 'ngStorage', 'ionic.native', 'indexedDB'])

  .controller('homeCtrl', ['$scope', '$stateParams', 'TestingFactory', "GeolocationService",// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, TestingFactory, geolocation) {
      console.log("Inside Home Controller");

      $scope.position = null;
      $scope.message = "Determining gelocation...";

      geolocation().then(function (position) {
        $scope.position = position;
        console.log("The Location", $scope.position)
      }, function (reason) {
        $scope.message = "Could not be determined."
      });

      TestingFactory.featured()
        .then(function (response){
          $scope.featured = response.data.data;
          console.log($scope.featured)
        });

    }])

  .controller('beerCtrl', ["$scope", "BeerFactory", "BeerService", "TestingFactory", "$ionicLoading", "$ionicPopup", "$ionicModal", "$indexedDB", '$cordovaToast', '$ionicPlatform',
    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, BeerFactory, BeerService, TestingFactory, $ionicLoading, $ionicPopup, $ionicModal, $indexedDB, $cordovaToast, $ionicPlatform) {
      console.log("Inside Beer Controller");

      $scope.fetchBeer = function () {
        $scope.beerNameSearch;
        console.log("BeerNameSearch = " + $scope.beerNameSearch);
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
            .then(function (response) {
                $scope.beer = response.data.data;
                // console.log($scope.beer);
                $ionicLoading.hide();
                var beerData = response.data.data;
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
            .then(function (response) {
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

      $ionicPlatform.ready(function () {
        $cordovaToast.show("testing toast", "5000", 'center');
      });

      $scope.saveFavorite = function (id, name, style) {
        console.log("Inside saveFavorites Function");
        console.log("DrinkID = " + id);
        console.log("DrinkName = " + name);

        var alertPopup = $ionicPopup.alert({
          title: name + ' Saved to Favorites'
        });

        alertPopup.then(function(res) {
          console.log('Thank you for advice.');
        });

        // $cordovaToast.show(name + " added to favorites", "5000", 'center')

        $indexedDB.openStore('favorites', function (store) {
          // single item

          console.log(name + " added to favorites");
          store.insert({"drinkID": id, "drinkName": name, "drinkStyle": style}).then(function (e) {

          });
        });

      }


    }])

  .controller('breweryCtrl', ['$scope', '$stateParams', "$ionicLoading", "$ionicModal", "$ionicPopup", "TestingFactory", "GeolocationService",
    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $ionicLoading, $ionicModal, $ionicPopup, TestingFactory, geolocation) {

      console.log("Inside Brewery Controller");

      $scope.position = null;
      $scope.message = "Determining gelocation...";

      geolocation().then(function (position) {
        $scope.position = position;
        console.log($scope.position);

        TestingFactory.getNearby($scope.position.coords.latitude, $scope.position.coords.longitude)
          .then(function (response) {
            $scope.location = response.data.data;
            console.log($scope.location)
          });
      }, function (reason) {
        $scope.message = "Could not be determined."
      });


      $scope.fetchBrews = function () {
        $scope.brewNameSearch;
        console.log("BrewNameSearch = " + $scope.brewNameSearch);

        getBeers();

        function getBeers() {
          type = 'brewery';
          $scope.brew = {};
          TestingFactory.getBrews($scope.brewNameSearch, type)

            .then(function (response) {
                $scope.brew = response.data.data;
                var brewData = response.data.data;
                console.log($scope.brew);
              }, function (error) {
                $scope.status = "Unable to Load " + error.message;
              }
            )

        }
      };

      $scope.getsinglebeer = function (id) {
        type = 'brewery';
        console.log("Inside single beer");
        console.log("id" + id);

        TestingFactory.getSingleBrew(id, "beer")

          .then(function (response) {
              $scope.singleb = response.data.data;
              var beerData = response.data.data;
              console.log($scope.singleb);

            var alertPopup = $ionicPopup.show({
              template: '<p>' +beerData.description+'</p>',
              title: beerData.nameDisplay,
              subTitle: beerData.style.name,
              scope: $scope
            });

            $scope.closepopup = function () {
              alertPopup.close()
            };

            alertPopup.then(function(res) {
              console.log('Thank you for advice.');
            });

            }, function (error) {
              $scope.status = "Unable to Load " + error.message;
            }
          )


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
            .then(function (response) {
                var single = response.data.data;
                $scope.singlebrew = response.data.data;
                console.log(single);

                TestingFactory.getBrewBeer(id)
                  .then(function (response) {
                    var brewBeer = response.data.data
                    console.log(brewBeer)
                    $scope.brewBeer = brewBeer

                    $ionicLoading.hide();
                  })
              }
              , function (error) {
                console.log("Error" + error.message);
                $scope.status = "Unable to Load " + error.message;
                $scope.errorCard = "True";
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

  .controller('settingsCtrl', ['$scope', '$stateParams', '$ionicPopup', '$indexedDB',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $ionicPopup, $timeout, $indexedDB) {
      console.log("Inside Settings Controller");

      // $scope.resetFavs = function() {
      //   var confirmPopup = $ionicPopup.confirm({
      //     title: 'Consume Ice Cream',
      //     template: 'Are you sure you want to eat this ice cream?'
      //   });
      //
      //   confirmPopup.then(function(res) {
      //     if(res) {
      //       console.log('You are sure');
      //     } else {
      //       console.log('You are not sure');
      //     }
      //   });
      // };

      // $scope.resetFavs = function() {
      //   var alertPopup = $ionicPopup.alert({
      //     title: 'Don\'t eat that!',
      //     template: 'It might taste good'
      //   });
      //   alertPopup.then(function(res) {
      //     console.log('Thank you for not eating my delicious ice cream cone');
      //   });
      // };

      $scope.resetFavs = function () {
        $indexedDB.openStore('favorites', function (store) {
          store.clear().then(function () {
            console.log("Favorites Cleared")
            location.reload();
          });
        });
      }

    }])

  .controller('damgapCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('favoriteCtrl', ['$scope', '$stateParams', "$ionicLoading", "$ionicModal", 'TestingFactory', '$indexedDB',
    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $ionicLoading, $ionicModal, TestingFactory, $indexedDB) {

      console.log("Inside favoriteCtrl");

      $indexedDB.openStore('favorites', function (store) {
        store.getAll().then(function (beers) {
          // Update scope
          $scope.beers = beers;
          console.log($scope.beers)
        });
      });

      $scope.deleteFavorite = function (id) {
        $indexedDB.openStore('favorites', function (store) {
          console.log(id);
          store.delete(id).then(function () {
            location.reload();
          });
        });
      }

      $scope.doRefresh = function () {
        $indexedDB.openStore('favorites', function (store) {
          store.getAll().then(function (beers) {
            // Update scope
            $scope.beers = beers;
            console.log($scope.beers)
            $scope.$broadcast('scroll.refreshComplete');
          });
        });
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
            .then(function (response) {
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
      });


      $scope.holding = function () {
        console.log("Please Hold")
      }

    }])

  .controller('SuggestionsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }]);
