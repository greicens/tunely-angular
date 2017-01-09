angular
  .module('tunely')
  .controller('AlbumsShowController', AlbumsShowController);

AlbumsShowController.$inject = ['$http', '$routeParams', '$location'];
  function AlbumsShowController (  $http,   $routeParams, $location  ) {
    var vm = this;
    var albumId = $routeParams.id;

    $http({
      method: 'GET',
      url: '/api/albums'
    }).then(function successCallback(response) {
      vm.albums = response.data;
    }, function errorCallback(response) {
      console.log('There was an error getting the data', response);
    });

    $http({
      method: 'GET',
      url: '/api/albums/'+  albumId// how can we get the id? (hint: check console log from above)
    }).then(function successCallback(json) {
      vm.album = json.data;
    });

    vm.editAlbum = function (album) {
      console.log(album, "album in editAlbum")
      $http({
        method: 'PUT',
        url: '/api/albums/'+album._id,
        data: album
      }).then(function successCallback(json) {
        console.log(json, "json ")
      }, function errorCallback(response) {
        console.log('There was an error editing the data', response);
      });
    }

    vm.deleteAlbum = function (album) {
      console.log(album, " album")
      $http({
        method: 'DELETE',
        url: '/api/albums/'+ album._id
      }).then(function successCallback(json) {
        console.log(album," album inside sucess of delete");
        var index = vm.albums.indexOf(album);
        vm.albums.splice(index,1)
        $location.path('/api/albums');

      }, function errorCallback(response) {
        console.log('There was an error deleting the data', response);
      });
    }
  }
