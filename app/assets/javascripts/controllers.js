/* App Controllers */

function PhotographersCtrl($scope, Photographers) {
  $scope.photographers = Photographers.index();
}
PhotographersCtrl.$inject = ['$scope', 'Photographers'];

function GalleriesCtrl($scope, $routeParams, Galleries, Photographers) {
  $scope.photographer = Photographers.get({ photographer_id: $routeParams.photographer_id });
  $scope.galleries = Galleries.index({ photographer_id: $routeParams.photographer_id });
}
GalleriesCtrl.$inject =  ["$scope", "$routeParams", "Galleries", "Photographers"];

function PhotosCtrl($scope, Photos, Galleries, Photographers, SelectedPhotos, $routeParams) {
  $scope.photographer = Photographers.get({ photographer_id: $routeParams.photographer_id });
  $scope.gallery = Galleries.get({ photographer_id: $routeParams.photographer_id, gallery_id: $routeParams.gallery_id });
  $scope.photos = Photos.index({ photographer_id: $routeParams.photographer_id, gallery_id: $routeParams.gallery_id });
  $scope.selected_photos = SelectedPhotos.index();

  $scope.selectPhoto = function(photo) {
    var selected_photo = new SelectedPhotos({ selected_photo: { photo_id: photo.id } });
    selected_photo.$create(function() {
      $scope.selected_photos.push(selected_photo);
    });
  }

  $scope.deleteSelectedPhoto = function(selected_photo) {
    $scope.selected_photos = _.without($scope.selected_photos, selected_photo);
    selected_photo.$destroy({ selected_photo_id: selected_photo.id });
  }

  $scope.saveSelectedPhoto = function(selected_photo) {
    selected_photo.$update({ selected_photo_id: selected_photo.id });
    $('input').blur();
  }

}
PhotosCtrl.$inject = ['$scope', 'Photos', 'Galleries', 'Photographers', 'SelectedPhotos', '$routeParams'];
