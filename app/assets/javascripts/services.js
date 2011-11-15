/* http://docs.angularjs.org/#!angular.service */

angular.service('Photographers', function($resource) {
 return $resource('photographers/:photographer_id', {},
                  { 'index': { method: 'GET', isArray: true }});
});

angular.service('Galleries', function($resource) {
 return $resource('photographers/:photographer_id/galleries/:gallery_id', {},
                  { 'index': { method: 'GET', isArray: true }});
});

angular.service('Photos', function($resource) {
 return $resource('photographers/:photographer_id/galleries/:gallery_id/photos', {},
                  { 'index': { method: 'GET', isArray: true }});
});

angular.service('SelectedPhotos', function($resource) {
 return $resource('selected_photos/:selected_photo_id', {},
                    { 'create': { method: 'POST' },
                      'index': { method: 'GET', isArray: true },
                      'update': { method: 'PUT' },
                      'destroy': { method: 'DELETE' }});
});
