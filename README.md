Installing
==========

    $ git clone git@github.com:centresource/angularjs_rails_demo.git
    $ cd angularjs_rails_demo
    $ bundle install
    $ rake db:migrate RAILS_ENV=test
    $ rake db:migrate
    $ rake db:seed


Angular in Rails
================

This demo includes a fully working Rails app integrated with Angular.js. Note that I have opted to use Capybara based RSpec integration specs, with Javascript enabled, instead of the end-to-end testing built into Angular.js (in part because I couldn't get it to work with the Rails app, but I only gave it a cursory attempt because I planned to use RSPec integration specs anyway).



Basic Approach
==============

ApplicationController intercepts all html traffic, rendering 'layout/dynamic.html.erb'

All json traffic reaches its intended controller/action and renders the object for Angular.js to process


Running the Unit Specs
=====================

To run the unit tests (copied from http://docs.angularjs.org/#!/tutorial/step_02 (slightly modified)):
* In a separate terminal window or tab, go to the angular_demo directory and run ./scripts/test-server.sh to start the test web server.
* Open a new browser tab or window and navigate to http://localhost:9876.
* Choose "Capture this browser in strict mode".
* At this point, you can leave this tab open and forget about it. JsTestDriver will use it to execute the tests and report the results in the terminal.
* Execute the test by running ./js_script/test.sh

You should see something similar to the following:

    angular_demo$ js_script/test.sh 
    ...
    Total 3 tests (Passed: 3; Fails: 0; Errors: 0) (6.00 ms)
    Chrome 13.0.782.218 Mac OS: Run 3 tests (Passed: 3; Fails: 0; Errors 0) (6.00 ms)



Running the Integration Specs
============================

    angular_demo $ rspec spec/requests



Starting from Scratch
====================

This is how I began, starting with a new Rails project and the Angular.js seed project:

    demo $ git clone git://github.com/angular/angular-seed.git
    demo $ rails new angular_demo --skip-test-unit
    demo $ cd angular_demo
    angular_demo $ mv ../angular-seed/app/js/* public/javascripts
    angular_demo $ mv ../angular-seed/app/lib public/javascripts
    angular_demo $ mv ../angular-seed/app/partials public/javascripts
    angular_demo $ mv ../angular-seed/test js_spec # or js_test if you prefer a test dir
    angular_demo $ mv ../angular-seed/scripts js_script
    angular_demo $ mv ../angular-seed/config/* config/

Then, to configure unit specs:

(Note that the configuration steps have already been performed in the rails project.)

* modify the config/js... configuration files to match the project hierarchy
* modify js_script/test.sh and js_script/test-server.sh so that the path to the jar is ../js_spec instead of ../test
