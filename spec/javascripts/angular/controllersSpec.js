/* jasmine specs for controllers go here */
describe('AngularDemo controllers', function() {
  var scope, $httpBackend, $routeParams, ctrl;

  beforeEach(module("angularRailsDemo"));

  beforeEach(inject(function(_$httpBackend_, $rootScope) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();

    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  }));

  describe('PhotographersCtrl', function() {

    beforeEach(inject(function($controller) {
      $httpBackend.expectGET('photographers')
          .respond([{name: 'Anne Geddes'},
                    {name: 'Ansel Adams'}]);
      ctrl = $controller(PhotographersCtrl, {$scope: scope});
    }));

    it('should create "photographers" model with 2 photographers fetched from xhr', function() {
      expect(scope.photographers).toEqualData([]);
      $httpBackend.flush();

      expect(scope.photographers).toEqualData([{name: 'Anne Geddes'},
                                              {name: 'Ansel Adams'}]);
    });

  });

  describe('GalleriesCtrl', function() {
    var $routeParams;

    beforeEach(inject(function($routeParams, $controller) {
      $routeParams.photographer_id = 3;
      $httpBackend.expectGET('photographers/3').respond({name: 'Anne Geddes'});
      $httpBackend.expectGET('photographers/3/galleries').respond([{title: 'Ghost Ranch'}]);
      ctrl = $controller(GalleriesCtrl, {$scope: scope});
    }));

    it('should create a "photographers" model and a "galleries" array using data fetched from xhr for the current photographer', function() {
      expect(scope.photographer).toEqualData({});
      expect(scope.galleries).toEqualData([]);

      $httpBackend.flush();

      expect(scope.photographer).toEqualData({name: 'Anne Geddes'});
      expect(scope.galleries).toEqualData([{title: 'Ghost Ranch'}]);
    });

  });

  describe('PhotosCtrl', function() {

    beforeEach(inject(function($routeParams, $controller) {
      $routeParams.photographer_id = 3;
      $routeParams.gallery_id = 7;
      $httpBackend.expectGET('photographers/3').respond({name: 'Anne Geddes'});
      $httpBackend.expectGET('photographers/3/galleries/7').respond({title: 'Ghost Ranch'});
      $httpBackend.expectGET('photographers/3/galleries/7/photos').respond([{title: 'My Photo', url: 'http://example.com/my_photo.jpg'}]);
      $httpBackend.expectGET('selected_photos').respond([{title: 'My Selected Photo', id: 12}]);

      ctrl = $controller(PhotosCtrl, {$scope: scope});
    }));

    it('should create a "photographers" model, a "gallery" model, and a "photos" array using data fetched from xhr for the current photographer and gallery', function() {
      $httpBackend.flush();

      expect(scope.photographer).toEqualData({name: 'Anne Geddes'});
      expect(scope.gallery).toEqualData({title: 'Ghost Ranch'});
      expect(scope.photos).toEqualData([{title: 'My Photo', url: 'http://example.com/my_photo.jpg'}]);
      expect(scope.selected_photos).toEqualData([{title: 'My Selected Photo', id: 12}]);
    });

  });

});
