'use strict'

const path = require('path')
const projectRoot = path.resolve(__dirname, '..')

const _ = require('lodash')
const conf = require('./config')
const moment = require('moment-timezone')
const schedule = require('./schedule')
const Twitter = require('twitter')
const winston = require('winston')

const { promisify } = require('util')
const _request = require('request')
const request = promisify(_request)

const pkg = require(path.resolve(projectRoot, 'package.json'))

try {
  conf.validate({ allowed: 'strict' })
  winston.info(`${pkg.name}@${pkg.version}`)
  winston.info(`DATASOURCE: ${conf.get('DATASOURCE')}`)
}
catch (error) {
  const configErrorMessages = error.message.split('\n')
  configErrorMessages.forEach((message) => {
    winston.error('Bad config -', message)
  })

  // 9 - Invalid Argument
  // https://nodejs.org/api/process.html#process_exit_codes
  winston.error('narcisse STOPPED because of configuration errors.')
  process.exit(9)
}

const client = new Twitter({
  consumer_key: conf.get('TWITTER_CONSUMER_KEY'),
  consumer_secret: conf.get('TWITTER_CONSUMER_SECRET'),
  access_token_key: conf.get('TWITTER_ACCESS_TOKEN_KEY'),
  access_token_secret: conf.get('TWITTER_ACCESS_TOKEN_SECRET'),
})

function run () {

  winston.info(`-- START: Let's try to update the status`)
  winston.info(`-- Fetching datasource file`)

  request(conf.get('DATASOURCE'))
    .then((res) => {
      try {
        return JSON.parse(res.body)
      } catch (e) {
        return Promise.reject(e)
      }
    })
    .then(async (data) => {

      winston.info(`-- Datasource file found and valid (${data.scheduledProfiles.length} scheduled profiles)`)

      const now = new Date().getTime()

      const matchingProfiles = _(data.scheduledProfiles)
        .filter(({ from, to, profile, timezone }) => {
          const tz = timezone || data.defaultTimezone
          return schedule.dateMatches(now, tz, from, to)
        })
        .map(({ profile }) => profile)
        .value()

      let newProfile = data.defaultProfile
      if (matchingProfiles.length === 0) {
        winston.info(`-- No scheduled profiles for the current datetime`)
      }
      else if (matchingProfiles.length === 1) {
        newProfile = matchingProfiles[0]
      }
      else if (matchingProfiles.length > 1) {
        winston.warn(`-- More than one scheduled profile for the current datetime`)
      }

      await client.post('account/update_profile', newProfile)

      winston.info(`-- DONE: Profile is now:`)
      winston.info(`-- ${JSON.stringify(newProfile, null, '  ')}`)
    })
    .catch((e) => console.error(e))
}

run()
