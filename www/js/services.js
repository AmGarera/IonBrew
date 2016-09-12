angular.module('app.services', [])

  .constant('config', {
  appNam: 'IonicBrew',
  appVersion: "1.0",
  apiUrl: "http://api.brewerydb.com/v2/?key=62335776d75e185980011577ab2440a4",
  api_key: "62335776d75e185980011577ab2440a4"
})

  .factory('BeerFactory', [function($http){

    var getBeer;
    getBeer = function (beerName) {
      console.log(beerName);
      $http({
        method: 'GET',
        url: '"http://api.brewerydb.com/v2/beer/oeGSxs/?key=62335776d75e185980011577ab2440a4"'
      })
        .then(function successBeer(response) {
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

  .service('BeerService', [function($http){
    // console.log(constant.apiUrl);

    var getBeer = function (beerName) {
      console.log(beerName);
      $http.get("http://api.brewerydb.com/v2/search?q=" + beerName + "&type=beer/?key=62335776d75e185980011577ab2440a4")
        .then(function successBeer(response) {
          return response.data;
        }, function errorCallBack(response) {

        });
    };

    return {
      getBeer: getBeer
    }



  }])

  .service('BreweryService', [function(){

  }]);
