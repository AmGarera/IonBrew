angular.module('app.services', [])

app.constant('config', {
  appNam: 'IonicBrew',
  appVersion: "1.0",
  apiUrl: "http://api.brewerydb.com/v2/?key=62335776d75e185980011577ab2440a4",
  api_key: "62335776d75e185980011577ab2440a4"
})

  .factory('BeerFactory', [function(){

  }])

  .factory('BreweryFactory', [function(){

  }])

  .service('BeerService', [function($http){
    console.log(constant.apiUrl);

    var getBeer = function (beerName) {
      console.log(beerName);
      return $http.get("http://api.brewerydb.com/v2/beer/" + beerName + "/?key=" + constant.api_key)
        .then(function sucessBeer(response) {
          return response.data;
        }, function errorCallBack(resposne) {

        });
    };

    return {
      getBeer: getBeer
    }



  }])

  .service('BreweryService', [function(){

  }]);
