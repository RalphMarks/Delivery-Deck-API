const assert = require('assert');
const app = require('../../src/app');

describe('\'destinations\' service', () => {
  it('registered the service', () => {
    const service = app.service('destinations');

    assert.ok(service, 'Registered the service');
  });
});
