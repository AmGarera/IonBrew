angular.module('app.services', [])


  .factory('BeerFactory', ['$http', function($http){
    console.log("Opened BeerFactory");
    var getBeer;

    getBeer = function (beerName) {
      console.log("getBeer Called");
      console.log(beerName);
      $http({
        method: 'GET',
        url: "https://api.brewerydb.com/v2/beer/oeGSxs/?key=62335776d75e185980011577ab2440a4"
      })
      .then(
        function (response) {
          console.log(response.data);
          return response.data;

        }, function errorCallBack(response) {

        });
    };

    return {
      getBeer: getBeer
    }

  }])

  .factory('BreweryFactory', [function(){

  }])
  //Adrian we're using this this is how it needs to be structured but now we need to call it
  .service('BeerService', ['$http', function($http){
    // console.log(constant.apiUrl);

    this.getBeer = function (beerName) {
      console.log("get beer " + beerName);
      $http({
        method: 'GET',
        url: "https://api.brewerydb.com/v2/beer/oeGSxs/?key=62335776d75e185980011577ab2440a4"
      })
        .then(function (response) {
          console.log("sucessBeer Call");
          console.log(response.data);
          return response.data;
        });
      console.log("beerName = " + beerName);
      console.log("data = " + response);
    };

    // var getBeer = function (beerName) {
    //   console.log("get beer" + beerName);
    //   $http.get("https://api.brewerydb.com/v2/beer/oeGSxs/?key=62335776d75e185980011577ab2440a4")
    //     .then(function successBeer(response) {
    //       console.log("sucessBeer Calles")
    //       $scope.beerResults = response.data;
    //       console.log(response.data);
    //     }, function errorCallBack(response) {
    //
    //     });
    // };
    //
    // return {
    //   getBeer: getBeer
    // }



  }])

  .service('BreweryService', [function(){

  }])

  .factory('TestingFactory', ['$http', function($http, $scope){
    console.log("Testing Factory Called");
     var beer =  [];
    //Variables for Beer Search to simplify the code.
    var url = 'https://api.brewerydb.com/v2/';
    var search = 'search/';
    var testFactory = {};
    var apiKey = '?key=62335776d75e185980011577ab2440a4';
    //Search call to the API
    testFactory.getBrews = function (brewNameSearch, type) {
      console.log(url + search + apiKey + '&q=' + brewNameSearch + '&type=' + type);
      return $http.get(url + search + apiKey + '&q=' + brewNameSearch + '&type=' + type).success(function (data) {
        }
      );
    };

    testFactory.getSingleBrew = function (brewNameSearch, type) {
      //console.log("getUrl = " + url + type + "/" + brewNameSearch + "/?" +  apiKey );
      return $http.get(url + type + "/" + brewNameSearch + "/" +  apiKey).success(function (data) {
        }
      );
    };

    testFactory.getNearby = function (lat, long) {
      console.log(url + "search/geo/point/" + apiKey + "&lat=" + lat + "&lng=" + long);
      return $http.get(url + "search/geo/point/" + apiKey + "&lat=" + lat + "&lng=" + long).success(function (data) {
      });
    };
    testFactory.actuallyGetBeer = function () {
      return testFactory.data
    };

    console.log(testFactory);
    return testFactory;
  }])


  .factory("GeolocationService", ['$q', '$window', '$rootScope', function ($q, $window, $rootScope) {
    return function () {
      var deferred = $q.defer();

      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
        console.log("navigator.geolocation works well");
        navigator.geolocation.getCurrentPosition(function (position) {
          $rootScope.$apply(function () {
            deferred.resolve(position);
          });
        })
      }

      return deferred.promise;
    }
  }]);
