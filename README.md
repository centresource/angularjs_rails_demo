Note: Updated to AngularJS 0.10 branch
===============================

The documentation for the AngularJS 0.10 branch is at [http://docs-next.angularjs.org/](http://docs-next.angularjs.org/). The AngularJS changelog is at [https://github.com/angular/angular.js/blob/master/CHANGELOG.md](https://github.com/angular/angular.js/blob/master/CHANGELOG.md).

There is currently an error with jQuery cycle in production. I'm trying to figure out what, in the asset pipeline, is causing the problem, but thus far without success.

Angular.js in Rails
================

This demo includes a fully working Rails 3.1 app integrated with [Angular.js](http://angularjs.org/). It uses the Jasmine and JasmineRice gems to run the Angular.js unit specs and RSpec integration specs to test the fully functional app.

The purpose of this demo is to assist anyone looking to incorporate Angular.js into Rails, as well as anyone trying to decide which javascript framework to use with Rails. 

In order to remain accessible to a more general audience I have opted to use javascript, rather than coffeescript. However, the asset pipeline is fully functional (as evidenced by the controllers.js.erb file), and coffeescript can be substituted for any of the javascript specs or assets.

Here is a two part video that goes into detail about how to incorporate Angular.js into Rails 3.1, using this project as an example:

* [Part I](http://vimeo.com/30328747) gives some background about why we need a javascript framework in the first place.
* [Part 2](http://vimeo.com/30329977) dives into this demo application, including detailed explanation of Angular.js controllers, resources, and templates, as well as where the files reside in the Rails 3.1 file hierarchy.


Installing
==========

    $ git clone git@github.com:centresource/angularjs_rails_demo.git
    $ cd angularjs_rails_demo
    $ bundle install
    $ rake db:migrate RAILS_ENV=test
    $ rake db:migrate
    $ rake db:seed

To run the unit specs (using [jasminrice](https://github.com/bradphelan/jasminerice)):

    $ rails s
    Then direct a browser to http://localhost:3000/jasmine

To run the integration specs:

    $ rspec spec/requests
    OR (to run integration specs alongside all other specs)
    $ rake spec

To precompile the assets for trying it out in production:

    $ rake assets:precompile RAILS_ENV=production


Basic Approach
==============

ApplicationController intercepts all html traffic, rendering 'layout/dynamic.html.erb'

All json traffic reaches its intended controller/action and renders the object for Angular.js to process.


Starting from Scratch
=====================

Because Rails makes it so easy to run Jasmine unit specs and RSpec (or Cucumber) integration specs on javascript apps, we don't need most of the extra stuff that comes with Angular.js. All we really need are [angular.min.js and angular-ie-compat.js](https://github.com/angular/angular-seed/tree/master/app/lib/angular) and [angular-mocks.js](https://github.com/angular/angular-seed/tree/master/test/lib/angular).

Here are where I put the various files:

* angular.min.js and angular-ie-compat.js => vendor/assets/javascripts
* angular-mocks.js => spec/javascripts/helpers
* controllers.js, services.js, templates.js, and filters.js => app/assets/javascripts.
* Angular.js partials => app/assets/

In order to use [Jasmine](https://github.com/pivotal/jasmine) for our javascript unit specs, while remaining fully compatible with the asset pipeline, we use the [JasmineRice gem](https://github.com/bradphelan/jasminerice).

* spec/javascripts/spec.js.coffee is required by JasmineRice
* I put my angular-specific javascript specs into spec/javascripts/angular
* see spec/javascripts/angular/controllersSpec.js for an example


Note the following change to config/environments/production.rb [uglifying breaks AngularJS](http://groups.google.com/group/angular/browse_thread/thread/c1740992a86adde2):

    # AngularJS change:
    config.assets.js_compressor = Sprockets::LazyCompressor.new { Uglifier.new(:mangle => false) }

Wrap Params
===========

Rails 3.1 comes with some useful defaults for working with Angular.js. In earlier versions of Rails, the json representation of an object included the model name as a root element. This could be disabled, but then the params coming back to rails lacked the model-specific sub params.

That is, prior to 3.1, we would have:

    params = { 'id' => 1, 'controller' => 'my_controller', 'action' => 'my_action', 'real_param_1' => 'a', 'real_param_2' => 'b' }

Thanks to wrap_parameters in 3.1, we have:

    params = { 'id' => 1, 'controller' => 'my_controller', 'action' => 'my_action', 'my_model' => { 'real_param_1' => 'a', 'real_param_2' => 'b' } }

The only downside to wrap_parameters is that it builds itself from the database schema, not from attr_accessible, so if you have attributes that don't correspond to the database, you will have to list them not only in attr_accessible, but also in the controller. See [http://api.rubyonrails.org/classes/ActionController/ParamsWrapper/ClassMethods.html](http://api.rubyonrails.org/classes/ActionController/ParamsWrapper/ClassMethods.html) for details on how to customize what is passed.
