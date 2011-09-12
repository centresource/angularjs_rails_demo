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

All of the application-specific javascript files are in app/assets/javascript. The html partials are in public/partials.

Note the following changes to config/environments/production.rb:

  # angular.js change: we need to serve up the templates in public/partials
  config.serve_static_assets = true

  # angular.js change: don't uglify because the HTML templates need to know the names of variables
  # and methods in controller.js
  config.assets.js_compressor = Sprockets::LazyCompressor.new { Uglifier.new(:mangle => false) }

The first one poses a problem I have not yet figured out how to solve. controllers.js defines templates within routes like so:


    $route.when('/photographers',
        {template: 'partials/photographers.html', controller: PhotographersCtrl});

    $route.when('/photographers/:photographer_id/galleries',
        {template: 'partials/galleries.html', controller: GalleriesCtrl});

    $route.when('/photographers/:photographer_id/galleries/:gallery_id/photos',
        {template: 'partials/photos.html', controller: PhotosCtrl});

Note that the template paths are hard-coded. I don't see how to adjust these to match Rails' precompiled hash names, so I've left the partials in public/partials instead of moving them to app/assets. This is what necessitates the 'config.serve_static_assets = true' configuration. Unfortunately, this pulls the partials out of the asset pipeline, forcing one to manage file version numbers manually (eg: template: 'partials/photographers.html?3').


Wrap Params
===========

Rails 3.1 comes with some useful defaults for working with Angular.js. In earlier versions of Rails, the json representation of an object included the model name as a root element. This could be disabled, but then the params coming back to rails lacked the model-specific sub params.

That is, prior to 3.1, we would have:

    params = { 'id' => 1, 'controller' => 'my_controller', 'action' => 'my_action', 'real_param_1' => 'a', 'real_param_2' => 'b' }

Thanks to wrap_parameters in 3.1, we have:

    params = { 'id' => 1, 'controller' => 'my_controller', 'action' => 'my_action', 'my_model' => { 'real_param_1' => 'a', 'real_param_2' => 'b' } }

The only downside to wrap_parameters is that it builds itself from the database schema, not from attr_accessible, so if you have attributes that don't correspond to the database, you will have to list them not only in attr_accessible, but also in the controller. See http://api.rubyonrails.org/classes/ActionController/ParamsWrapper/ClassMethods.html for details on how to customize what is passed.
