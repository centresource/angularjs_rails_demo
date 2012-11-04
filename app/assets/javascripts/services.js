// http://docs.angularjs.org/#!angular.service

angular.module("services", ['ngResource']).

factory('Photographers', function($resource) {
  return $resource('photographers/:photographer_id', {}, {
    index: { method: 'GET', isArray: true }
  })
}).

factory('Galleries', function($resource) {
  return $resource('photographers/:photographer_id/galleries/:gallery_id', {}, {
    index: { method: 'GET', isArray: true }
  })
}).

factory('Photos', function($resource) {
  return $resource('photographers/:photographer_id/galleries/:gallery_id/photos', {}, {
    index: { method: 'GET', isArray: true }
  });
}).

factory('SelectedPhotos', function($resource, $window) {
  return $resource('selected_photos/:selected_photo_id', {}, {
    create: { method: 'POST' },
    index: { method: 'GET', isArray: true },
    update: { method: 'PUT' },
    destroy: { method: 'DELETE' }
  });
});
