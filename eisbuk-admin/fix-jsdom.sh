#!/bin/bash

# This PR lays unmerged, so we apply it with this script:
# https://github.com/jsdom/jsdom/pull/3073

find node_modules/ -name xhr-utils.js -exec patch -N -r- {} ./jsdom.patch \;
