#= require jquery
#= require angular.min
#= require helpers/angular-mocks
#= require services
#= require controllers

/* jasmine specs for controllers go here */
describe('AngularDemo controllers', function() {
  var scope, $browser, $routeParams, ctrl;

  beforeEach(function() {
    scope = angular.scope();
    $browser = scope.$service('$browser');
    $routeParams = scope.$service('$routeParams');

    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('PhotographersCtrl', function() {

    beforeEach(function() {
      $browser.xhr.expectGET('photographers')
          .respond([{name: 'Anne Geddes'},
                    {name: 'Ansel Adams'}]);
      ctrl = scope.$new(PhotographersCtrl);
    });

    it('should create "photographers" model with 2 photographers fetched from xhr', function() {
      expect(ctrl.photographers).toEqualData([]);
      $browser.xhr.flush();
 
      expect(ctrl.photographers).toEqualData([{name: 'Anne Geddes'},
                                              {name: 'Ansel Adams'}]);
    });

  });

  describe('GalleriesCtrl', function() {

    it('should create a "photographers" model and a "galleries" array using data fetched from xhr for the current photographer', function() {
      $routeParams.photographer_id = 3;

      $browser.xhr.expectGET('photographers/3').respond({name: 'Anne Geddes'});
      $browser.xhr.expectGET('photographers/3/galleries').respond([{title: 'Ghost Ranch'}]);

      ctrl = scope.$new(GalleriesCtrl);
 
      expect(ctrl.photographer).toEqualData({});
      expect(ctrl.galleries).toEqualData([]);

      $browser.xhr.flush();
 
      expect(ctrl.photographer).toEqualData({name: 'Anne Geddes'});
      expect(ctrl.galleries).toEqualData([{title: 'Ghost Ranch'}]);
    });

  });

  describe('PhotosCtrl', function() {

    it('should create a "photographers" model, a "gallery" model, and a "photos" array using data fetched from xhr for the current photographer and gallery', function() {
      $routeParams.photographer_id = 3;
      $routeParams.gallery_id = 7;

      $browser.xhr.expectGET('photographers/3').respond({name: 'Anne Geddes'});
      $browser.xhr.expectGET('photographers/3/galleries/7').respond({title: 'Ghost Ranch'});
      $browser.xhr.expectGET('photographers/3/galleries/7/photos').respond([{title: 'My Photo', url: 'http://example.com/my_photo.jpg'}]);
      $browser.xhr.expectGET('selected_photos').respond([{title: 'My Selected Photo', id: 12}]);

      ctrl = scope.$new(PhotosCtrl);

      $browser.xhr.flush();
 
      expect(ctrl.photographer).toEqualData({name: 'Anne Geddes'});
      expect(ctrl.gallery).toEqualData({title: 'Ghost Ranch'});
      expect(ctrl.photos).toEqualData([{title: 'My Photo', url: 'http://example.com/my_photo.jpg'}]);
      expect(ctrl.selected_photos).toEqualData([{title: 'My Selected Photo', id: 12}]);
    });

  });

});
