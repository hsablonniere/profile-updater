'use strict'

const moment = require('moment-timezone')

module.exports = {
  dateMatches (now, timezone, relativeFrom, relativeTo) {
    const from = moment.tz(relativeFrom, timezone).valueOf()
    const to = moment.tz(relativeTo, timezone).valueOf()
    return (from <= now) && (now <= to)
  },
}
