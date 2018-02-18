'use strict'

// Always require test-utils, if you don't need to spy on callbacks, you can just import "expect"
const { expect } = require('./test-utils')

// Require the functions to be tested
const { dateMatches } = require('../src/schedule')

describe('schedule.dateMatches()', () => {

  it('after UTC+0', () => {
    const now = 0
    const tz = 'Atlantic/Reykjavik'
    const from = '1969-12-31 23:58'
    const to = '1969-12-31 23:59'
    const matches = dateMatches(now, tz, from, to)
    expect(matches).to.be.false()
  })

  it('after UTC+9', () => {
    const now = 0
    // Tokyo is at UTC+9
    const tz = 'Asia/Tokyo'
    const from = '1970-01-01 08:58'
    const to = '1970-01-01 08:59'
    const matches = dateMatches(now, tz, from, to)
    expect(matches).to.be.false()
  })

  it('between UTC+0', () => {
    const now = 0
    const tz = 'Atlantic/Reykjavik'
    const from = '1969-12-31 23:59'
    const to = '1970-01-01 00:01'
    const matches = dateMatches(now, tz, from, to)
    expect(matches).to.be.true()
  })

  it('between UTC+9', () => {
    const now = 0
    // Tokyo is at UTC+9
    const tz = 'Asia/Tokyo'
    const from = '1970-01-01 08:59'
    const to = '1970-01-01 09:01'
    const matches = dateMatches(now, tz, from, to)
    expect(matches).to.be.true()
  })

  it('before UTC+0', () => {
    const now = 0
    const tz = 'Atlantic/Reykjavik'
    const from = '1970-01-01 00:01'
    const to = '1970-01-01 00:02'
    const matches = dateMatches(now, tz, from, to)
    expect(matches).to.be.false()
  })

  it('before UTC+9', () => {
    const now = 0
    // Tokyo is at UTC+9
    const tz = 'Asia/Tokyo'
    const from = '1970-01-01 09:01'
    const to = '1970-01-01 09:02'
    const matches = dateMatches(now, tz, from, to)
    expect(matches).to.be.false()
  })
})
