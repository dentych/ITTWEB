#!/bin/bash

node_modules/.bin/tsc && node_modules/.bin/concurrently "node_modules/.bin/tsc -w" "node_modules/.bin/lite-server"
