Angular in Rails
================

This demo includes a fully working Rails 3.1 app integrated with Angular.js. It uses the Jasmine gem to run the Angular.js unit specs and RSpec integration specs to test the fully functional app.


Installing
==========

    $ git clone git@github.com:centresource/angularjs_rails_demo.git
    $ cd angularjs_rails_demo
    $ bundle install
    $ rake db:migrate RAILS_ENV=test
    $ rake db:migrate
    $ rake db:seed

To run the unit specs:

    $ rake jasmine:ci

To run the integration specs:

    $ rake spec


Basic Approach
==============

ApplicationController intercepts all html traffic, rendering 'layout/dynamic.html.erb'

All json traffic reaches its intended controller/action and renders the object for Angular.js to process


Starting from Scratch
=====================

Because Rails makes it so easy to run Jasmine unit specs and RSpec (or Cucumber) integration specs on Javascript apps, we don't need most of the extra stuff that comes with Angular.js. All we need to do is:

* include the angular.min.js and agular-ie-compat.js files—which you can get from https://github.com/angular/angular-seed/tree/master/app/lib/angular — in vendor/assets/javascripts
* update src_files—in spec/javascripts/support/jasmine.yml—to list angular in the vendor assets and the application javascript files in app/assets

All of the application-specific javascript files are in app/assets/javascripts. The html partials are in app/assets/templates.

In order for controllers.js to use the html templates from the asset pipeline, we insert the asset names into variables in the document header, and then access those in the route declarations of controllers.js:

In app/views/layouts/dynamic.html.erb:
    
    <script type="text/javascript">
      var photographers_template = "<%= asset_path('photographers.html') %>";
      var galleries_template = "<%= asset_path('galleries.html') %>";
      var photos_template = "<%= asset_path('photos.html') %>";
    </script>

In app/assets/javascripts/controllers.js:

    function PhotoGalleryCtrl($route, $xhr) {
      ...
      $route.when('/photographers',
          {template: photographers_template, controller: PhotographersCtrl});
      
      $route.when('/photographers/:photographer_id/galleries',
          {template: galleries_template, controller: GalleriesCtrl});
      
      $route.when('/photographers/:photographer_id/galleries/:gallery_id/photos',
          {template: photos_template, controller: PhotosCtrl});

Note the following change to config/environments/production.rb:

  # angular.js change: don't uglify because the HTML templates need to know the names of variables
  # and methods in controller.js
  config.assets.js_compressor = Sprockets::LazyCompressor.new { Uglifier.new(:mangle => false) }


Wrap Params
===========

Rails 3.1 comes with some useful defaults for working with Angular.js. In earlier versions of Rails, the json representation of an object included the model name as a root element. This could be disabled, but then the params coming back to rails lacked the model-specific sub params.

That is, prior to 3.1, we would have:

    params = { 'id' => 1, 'controller' => 'my_controller', 'action' => 'my_action', 'real_param_1' => 'a', 'real_param_2' => 'b' }

Thanks to wrap_parameters in 3.1, we have:

    params = { 'id' => 1, 'controller' => 'my_controller', 'action' => 'my_action', 'my_model' => { 'real_param_1' => 'a', 'real_param_2' => 'b' } }

The only downside to wrap_parameters is that it builds itself from the database schema, not from attr_accessible, so if you have attributes that don't correspond to the database, you will have to list them not only in attr_accessible, but also in the controller. See http://api.rubyonrails.org/classes/ActionController/ParamsWrapper/ClassMethods.html for details on how to customize what is passed.
