Angular in Rails
================

This demo includes a fully working Rails app integrated with Angular.js. Note that I have opted to use Capybara based RSpec integration specs, with Javascript enabled, instead of the end-to-end testing built into Angular.js (in part because I couldn't get it to work with the Rails app, but I only gave it a cursory attempt because I planned to use RSPec integration specs anyway).



Basic Approach
================

ApplicationController intercepts all html traffic and uses it to render layout/dynamic.

All json traffic reaches its intended controller/action and renders the object for Angular.js to process.



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
    angular_demo$ mv ../angular-seed/config/* config/


To run unit specs:
* modify the config/js... configuration files
* modify js_script/test.sh and js_script/test-server.sh so that the path to the jar is ../js_spec instead of ../test
* copied from http://docs.angularjs.org/#!/tutorial/step_02 (slightly modified):
* In a separate terminal window or tab, go to the angular-phonecat directory and run ./scripts/test-server.sh to start the test web server.
* Open a new browser tab or window and navigate to http://localhost:9876.
* Choose "Capture this browser in strict mode".
* At this point, you can leave this tab open and forget about it. JsTestDriver will use it to execute the tests and report the results in the terminal.
* Execute the test by running ./js_script/test.sh

You should see the following or similar output:
    Chrome: Runner reset.
         .
         Total 1 tests (Passed: 1; Fails: 0; Errors: 0) (2.00 ms)
           Chrome 11.0.696.57 Mac OS: Run 1 tests (Passed: 1; Fails: 0; Errors 0) (2.00 ms)
    Yay! The test passed! Or not...
    Note: If you see errors after you run the test, close the browser tab and go back to the terminal and kill the script, then repeat the procedure above.
