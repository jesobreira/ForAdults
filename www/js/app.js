alert('oi');

var app = angular.module('app', ['ngRoute']);

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
    
