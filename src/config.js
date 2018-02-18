'use strict'

const convict = require('convict')

const conf = convict({
  NODE_ENV: {
    doc: 'The applicaton environment.',
    format: ['development', 'production'],
    default: 'development',
    env: 'NODE_ENV',
  },
  DATASOURCE: {
    doc: 'The remote file where we can fetch the data.',
    format: String,
    default: null,
    env: 'DATASOURCE',
  },
  TWITTER_CONSUMER_KEY: {
    doc: 'The consumer key for the Twitter account.',
    format: String,
    default: null,
    env: 'TWITTER_CONSUMER_KEY',
  },
  TWITTER_CONSUMER_SECRET: {
    doc: 'The consumer secret for the Twitter account.',
    format: String,
    default: null,
    env: 'TWITTER_CONSUMER_SECRET',
  },
  TWITTER_ACCESS_TOKEN_KEY: {
    doc: 'The access token key for the Twitter account.',
    format: String,
    default: null,
    env: 'TWITTER_ACCESS_TOKEN_KEY',
  },
  TWITTER_ACCESS_TOKEN_SECRET: {
    doc: 'The access token secret for the Twitter account.',
    format: String,
    default: null,
    env: 'TWITTER_ACCESS_TOKEN_SECRET',
  },
})

module.exports = conf
