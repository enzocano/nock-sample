"use strict";
const assert = require('assert');
const testNock = require('./nockHelper');
const RedditClient = require('../lib').RedditClient;

describe('Reddit client tests', function() {
    it('best', function(done) {
        const client = new RedditClient();
        const flow = client.best().then(results => {
            assert.strictEqual(results.length, 15);
            assert.strictEqual(results[1], 'Best viral videos of the week #1!');
        });
        testNock.resolveWithMocks('reddit-best', done, flow);
    });

    it('argentina', function(done) {
        testNock.resolveWithMocks('reddit-arg', done, async function() {
            const client = new RedditClient();
            const results = await client.argentina();
            assert.strictEqual(results.length, 27);
            assert.strictEqual(results[0], 'Thread diario de dudas y consultas - jueves 25/4');
        });
    });
});
