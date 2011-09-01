#!/bin/bash

BASE_DIR=`dirname $0`

java -jar "$BASE_DIR/../js_spec/lib/jstestdriver/JsTestDriver.jar" \
     --config "$BASE_DIR/../config/jsTestDriver.conf" \
     --basePath "$BASE_DIR/.." \
     --tests all
