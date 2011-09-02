/* App Controllers */

/*
 * Force the DOM to render bound data so you can access the DOM elements
 * 
 * If the expected dom elements are not present when you try to execute 
 * forceRender on something, try a larger delay (for example, when rendering 
 * more complicated dom structures or a lot of data)
 */
function forceRender(arg1, arg2) {
    var delay = (arg1 instanceof Function ? 5 : arg1);
    var func = (arg1 instanceof Function ? arg1 : arg2);
    /*
     * http://docs.angularjs.org/#!/api/angular.service.$updateView reports
     * that scope.$root.$eval() should force an immediate render; however, 
     * angular.scope().$root.$eval() wasn't immediate enough for new elements
     * to be present when using jQuery on an expected DOM element
     */
    angular.service('$updateView').delay = 0;
    var updated_function = function() {
      func();
      angular.service('$updateView').delay = 25;
    };
    setTimeout(updated_function, delay);
}

function PhotoGalleryCtrl($route, $xhr) {
  $xhr.defaults.headers.post['Content-Type'] = 'application/json'
  $xhr.defaults.headers.put['Content-Type'] = 'application/json'

  $route.when('/photographers',
      {template: 'partials/photographers.html', controller: PhotographersCtrl});

  $route.when('/photographers/:photographer_id/galleries',
      {template: 'partials/galleries.html', controller: GalleriesCtrl});

  $route.when('/photographers/:photographer_id/galleries/:gallery_id/photos',
      {template: 'partials/photos.html', controller: PhotosCtrl});

  $route.otherwise({redirectTo: '/photographers'});
 
  $route.onChange(function() {
    this.params = $route.current.params;
  });
}

function PhotographersCtrl(Photographers) {
  this.photographers = Photographers.index();
}

function GalleriesCtrl(Galleries, Photographers) {
  this.galleries = Galleries.index({photographer_id: this.params.photographer_id});
  this.photographer = Photographers.get({photographer_id: this.params.photographer_id});
}

function PhotosCtrl(Photos, Galleries, Photographers, SelectedPhotos) {
  var self = this;

  self.gallery = Galleries.get({photographer_id: this.params.photographer_id, gallery_id: this.params.gallery_id});
  self.photographer = Photographers.get({photographer_id: this.params.photographer_id});

  Photos.index({photographer_id: this.params.photographer_id, gallery_id: this.params.gallery_id}, function(photos) {
    self.photos = photos;
    forceRender(function() {
      $('#photos').cycle({fx: 'fade', 
                          speed: 500,
                          timeout: 3000,
                          pause: 1,
                          next: '#next',
                          prev: '#prev'});
    });
  });
  self.selected_photos = SelectedPhotos.index();

  $('#photos .photo').live('click', function() {
    var photo_id = $(this).attr('id');
    var selected_photo = new SelectedPhotos({ selected_photo: {
                                                               photo_id: photo_id
                                                              }
                                             });
    selected_photo.$create();
    self.selected_photos.push(selected_photo);
  });

  $('#selected_photos .selected_photo input').live('blur', function() {
    var selected_photo_id = $(this).parent().attr('id');
    for (var i = 0; i < self.selected_photos.length; i++) {
        var selected_photo = self.selected_photos[i];
        if (String(selected_photo.selected_photo.id) == selected_photo_id){
            selected_photo.$update({ selected_photo_id: selected_photo.selected_photo.id });
        }
    }
  });

}
