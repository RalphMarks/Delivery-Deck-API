const assert = require('assert');
const app = require('../../src/app');

describe('\'messengers\' service', () => {
  it('registered the service', () => {
    const service = app.service('messengers');

    assert.ok(service, 'Registered the service');
  });
});
