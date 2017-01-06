/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);
  // ^ the first argument is a string naming the controller,
  // the second argument is a function that defines the capacities
  // of the controller.
AlbumsIndexController.$inject = ['$http']
function AlbumsIndexController ($http) {
  var vm = this;
  vm.newAlbum = {};

  vm.newAlbum = {
      name: 'Viva Hate',
      artistName: 'Morrissey'
  };

  $http({
    method: 'GET',
    url: 'http://localhost:3000/api/albums'
  }).then(onSucess, onError)

  function onSucess(response){
    console.log(response);
    vm.albums = response.data;
  }

  function onError(error){
    console.log('There was an error');
  }

  vm.createAlbum = function () {
  $http({
    method: 'POST',
    url: '/api/albums',
    data: vm.newAlbum,
  }).then(successCallback, errorCallback)

  function successCallback(response) {
    vm.albums.push(response.data);
  }
  function errorCallback(response) {
    console.log('There was an error posting the data', response);
  }
}
function onError(error){
  console.log('There was an error');
}
