'use strict';

const chai = require('chai');
const expect = chai.expect;

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

// this must be loaded after the other plugins
// https://github.com/prodatakey/dirty-chai#plugin-assertions
const dirtyChai = require('dirty-chai');
chai.use(dirtyChai);

module.exports = { expect };
