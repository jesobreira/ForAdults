
function VideosController($scope, $http) {
  var url = 'http://cors-server.getup.io/url/api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=amateur&thumbsize=all';
  var method = 'GET';
  
  $http({
    url: url,
    method: method
  }).
  success(function(data){
    $scope.videos = data;
  }).
  error(function(err){
    console.log('Erro: ', err);
  });
};

VideosController['$inject'] = ['$scope', '$http'];