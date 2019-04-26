"use strict";
// 'wild' | 'dryrun' | 'record' | 'lockdown';
const TEST_MODE = process.env.TEST_MODE || 'record';

const nockBack = require('nock').back;
nockBack.setMode(TEST_MODE);
nockBack.fixtures = __dirname + '/nockFixtures';

function resolvePromise(testFlow) {
    if (typeof testFlow === 'function') {
        return Promise.resolve(testFlow());
    }

    return Promise.resolve(testFlow);
}

function resolveWithMocks(testName, done, testFlow) {
    nockBack(`${testName}.json`, function(nockDone) {
        resolvePromise(testFlow)
        .then(nockDone)
        .then(done)
        .catch(done);
    });
}

module.exports = {
    resolveWithMocks: resolveWithMocks,
    testMode: TEST_MODE
}
