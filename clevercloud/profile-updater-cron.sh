#! /usr/bin/env bash

set -euo pipefail

source /home/bas/applicationrc
node ${APP_HOME}/src/profile-updater.js
