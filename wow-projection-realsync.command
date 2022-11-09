#!/bin/bash

here="`dirname \"$0\"`"
target="/"
projectpath=$here$target

perl /usr/local/opt/dklab_realsync/realsync "$projectpath"
