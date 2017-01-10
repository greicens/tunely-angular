angular
  .module('tunely')
  .controller('AlbumsShowController', AlbumsShowController);

AlbumsShowController.$inject = ['$http', '$routeParams'];

function AlbumsShowController ($http, $routeParams) {
  var vm = this;
  vm.newSong = {};
  var searchUrl = 'https://api.spotify.com/v1/search?type='; 
  $http({
    method: 'GET',
    url: '/api/albums/'+$routeParams.id
  }).then(function successCallback(response){
    var album = response.data;
    console.log(album,"response album");
    $http({
      method: 'GET',
      url: searchUrl +  album.name
    }).then(function spotifyCallback(spotifyResponse){
      console.log("spotify success ", spotifyResponse.data.track);
    })
  });


  $http({
    method: 'GET',
    url: '/api/albums/'+$routeParams.id
  }).then(function successCallback(json) {
    vm.album = json.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createSong = function(){
    $http({
      method: 'POST',
      url: '/api/albums/' + $routeParams.id + '/songs',
      data: vm.newSong
    }).then(function successCallback(response){
      vm.album.songs.push(response.data);
    }, function errorCallback(response){
      console.log('There was an error creating a new song', response);
    });
  }

  vm.deleteSong = function(song){
    console.log(song, "this is song inside delete song");
    $http({
      method: 'DELETE',
      url: '/api/albums/' +$routeParams.id + '/songs/' + song._id
    }).then(function deleteCallback(response){
      console.log("deleted song sucessfully", response.data);
      console.log(vm.album.songs, 'album.songs');
      var index = vm.album.songs.indexOf(song);
      vm.album.songs.splice(index, 1);
    })
  }

  vm.editSong = function(song){
    console.log(song, "this is song inside edit song");
    $http({
      method: 'PUT',
      url: '/api/albums/' +$routeParams.id + '/songs/' + song._id,
      data: song
    }).then(function editCallback(response){
      console.log("edit song sucessfully", response.data);
      console.log(vm.album.songs, 'album.songs');
      var index = vm.album.songs.indexOf(song);
      vm.album.songs.splice(index, 1, song);
    });
  }



}
