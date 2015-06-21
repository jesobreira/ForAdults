   
var app = angular.module('app', ['ngRoute']);

function categoriesFunction($scope, $http) {
  var url = 'http://cors-server.getup.io/url/api.redtube.com/?data=redtube.Categories.getCategoriesList&output=json';
  var method = 'GET';
  $http({
    url: url,
    method: method
  }).
  success(function(data){
      $scope.categories = data;
  }).
  error(function(err){
    console.log('Erro: ', err);
  })

  return $scope;
};

app.config(function($routeProvider, $locationProvider) {
 
   $routeProvider
 
   // para a rota '/', carregaremos o template home.html e o controller 'HomeCtrl'
   .when('/', {
      templateUrl : 'templates/home.html',
      controller  : 'HomeCtrl',
   })
   .when('/videos/:category', {
      templateUrl: 'templates/videos.html',
      controller : 'VideosCtrl'
   })
  
   // caso não seja nenhum desses, redirecione para a rota '/'
   .otherwise ({ redirectTo: '/' });
});
    

function CategoryController ($scope, $http) {
   $scope.reverse = false;
   $scope.predicate = 'name';

   $scope.ordenar = function () {
      $scope.predicate = 'price';
      $scope.reverse = !$scope.reverse
   }

   var categories = categoriesFunction($scope, $http);

   $scope.categories = $scope.categories;
};

CategoryController['$inject'] = ['$scope', '$http'];

