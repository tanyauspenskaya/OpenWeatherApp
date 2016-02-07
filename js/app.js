// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var wApp = angular.module('wApp', ['ionic', 'ngRoute', 'ngSanitize'])



.run(function($ionicPlatform, $rootScope, $location) {

  $rootScope.goHome = function() {
    $location.path('/cities');
  }


  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

wApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/cities',
  {
    controller: 'cController',
    templateUrl: 'partials/cities.html'
  })
  .when('/weather/:itemId',
  {
    controller: 'wController',
    templateUrl: 'partials/weather.html'
  })
  .otherwise({redirectTo: '/cities'});
}]);

wApp.controller('cController', ['$scope', '$http', '$ionicLoading',
  function($scope, $http, $ionicLoading){
    $scope.loadTowns = function(){
      $ionicLoading.show();
      $http.get('http://api.openweathermap.org/data/2.5/group?id=2988507,5368361,2950159,1835848,756135,3117735,6458923,658225,3065328,2172517&units=metric&appid=44db6a862fba0b067b1930da0d769e98')
      .success(function(response){
        //console.log(response);
        $scope.list = response.list;
        $ionicLoading.hide();
      })
      .finally(function(){
        $scope.$broadcast('scroll.refreshComplete');
      });
    };
    $scope.loadTowns();
  }]);


wApp.controller('wController', ['$scope', '$http', '$routeParams', '$ionicLoading', function($scope, $http, $routeParams, $ionicLoading){
  $ionicLoading.show();
  $http.get('http://api.openweathermap.org/data/2.5/group?id=2988507,5368361,2950159,1835848,756135,3117735,6458923,658225,3065328,2172517&units=metric&appid=44db6a862fba0b067b1930da0d769e98')
  .success(function(response){
    $scope.name = response.list[$routeParams.itemId].name;
    $scope.temp = response.list[$routeParams.itemId].main.temp;
    $scope.desc = response.list[$routeParams.itemId].weather[0].description;
    $scope.lon = response.list[$routeParams.itemId].coord.lon;
    $scope.lat = response.list[$routeParams.itemId].coord.lat;
    $ionicLoading.hide();
  });
}]);